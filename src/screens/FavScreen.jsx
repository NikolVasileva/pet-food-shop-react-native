import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useFavContext } from "../contexts/favourite/FavProvider";
import { shopService } from "../services";
import ProductCard from "../components/ProductCard";
import { useAuth } from "../contexts/auth/useAuth";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FavScreen() {
    const { favorites, removeFromFavorites } = useFavContext();
    const { user } = useAuth();
    const [favProducts, setFavProducts] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        async function loadFavoritesProducts() {
            if (!favorites || favorites.length === 0 || !user) {
                setFavProducts([]);
                return;
            }

            try {
                const userFav = favorites.find(f => f.userId === user.id);
                if (!userFav) {
                    setFavProducts([]);
                    return;
                }

                const productIds = userFav.products;
                const productsData = await Promise.all(
                    productIds.map(pid =>
                        shopService.fetchGetProductsById(pid)
                            .then(res => res.data)
                            .catch(err => {
                                console.log(`Cannot fetch product ${pid}`, err);
                                return null;
                            })
                    )
                );

                setFavProducts(productsData.filter(p => p));
            } catch (err) {
                console.log("Cannot load favorite products", err);
            }
        }

        loadFavoritesProducts();
    }, [favorites, user]);

    if (!favProducts || favProducts.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyTitle}>💖 No Favorites Yet</Text>
                <Text style={styles.emptyText}>Browse products and tap the heart to add favorites!</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.title}>Your Favorites</Text>

                <FlatList
                    data={favProducts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <ProductCard
                            id={item.id}
                            name={item.name}
                            price={item.price}
                            image={item.image}
                            onPress={() => navigation.navigate("ProductScreen", { productId: item.id })}
                            onRemove={async () => {
                                await removeFromFavorites(item.id);
                                setFavProducts(prev => prev.filter(p => p.id !== item.id));
                            }}
                        />
                    )}
                    contentContainerStyle={styles.listContainer}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f8f8f8",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 24,
        color: "#00B8BD",
        textAlign: "center",
    },
    listContainer: {
        paddingBottom: 30,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        backgroundColor: "#F5F5F5",
    },
    emptyTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#00B8BD",
        textAlign: "center",
    },
    emptyText: {
        fontSize: 16,
        color: "#555",
        textAlign: "center",
    },
    // ProductCard styles
    card: {
        width: "100%",
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 15,
        elevation: 2,
    },
    image: {
        width: 120,
        height: 120,
    },
    info: {
        flex: 1,
        padding: 10,
        justifyContent: "space-between",
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
    },
    price: {
        fontSize: 16,
        color: "#00B8BD",
    },
    removeButton: {
        marginTop: 10,
        backgroundColor: "#FF6B81",
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 6,
        alignSelf: "flex-start",
    },
    removeText: {
        color: "#fff",
        fontWeight: "bold",
    },
});