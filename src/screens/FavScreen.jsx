import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useFavContext } from "../contexts/favourite/FavProvider";
import { shopService } from "../services";
import ProductCard from "../components/ProductCard";
import { useAuth } from "../contexts/auth/useAuth";
import { useNavigation } from "@react-navigation/native";

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
        // Взимаме само текущия потребител
        const userFav = favorites.find(f => f.userId === user.id);
        if (!userFav) {
          setFavProducts([]);
          return;
        }

        const productIds = userFav.products; // масив от ID-та

        // Взимаме всички продукти за тези ID-та
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

        // Филтрираме null стойности (ако някой продукт не е намерен)
        setFavProducts(productsData.filter(p => p));
      } catch (err) {
        console.log("Cannot load favorite products", err);
      }
    }

    loadFavoritesProducts();
  }, [favorites, user]);

  if (!favProducts || favProducts.length === 0) {
    return (
      <View style={styles.center}>
        <Text>You don't have favorite products!</Text>
      </View>
    );
  }

  return (
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
      contentContainerStyle={{ padding: 10 }}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});