//import * as WebBrowser from 'expo-web-browser';
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { Button, FlatList, ListRenderItem, StyleSheet, Text, View } from "react-native";


interface Produto {
    id: number;
    title: string;
    price: string;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

const onClick = () => {
    alert("Adicionando...")
}

export default function Index() {
    const [data, setData] = useState<Produto[] | null>(null);

    const renderItem: ListRenderItem<Produto> = ({ item }) => {
        return (
            <View style={styles.card}>
                {/* CARD HEADER */}
                <View style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: 24,
                }}>
                    <Text style={{ textAlign: "center", marginTop: 8, paddingVertical: 4, paddingHorizontal: 8, backgroundColor: "#f0f0f0", borderRadius: 100 }}>{item.category}</Text>
                    <Image source={item.image} style={{ width: 100, height: 100, borderRadius: 20 }} />
                    <View style={{ flexShrink: 1, width: "100%", }}>
                        <Text
                            numberOfLines={2}
                            style={{
                                textAlign: "center",
                                fontSize: 16,
                                fontWeight: "bold",
                                color: "000",
                                marginBottom: 4,
                                flexWrap: "wrap",
                                height: 40,
                            }}>
                            {item.title}
                        </Text>
                        <Text
                            numberOfLines={2}
                            style={{
                                fontSize: 14,
                                fontWeight: "normal",
                                color: "000",
                                marginBottom: 4,
                                flexWrap: "wrap",
                                overflow: "scroll",
                            }}>
                            {item.description}
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        height: 1,
                        backgroundColor: "#4e1b4e",
                        marginVertical: 8,
                    }}
                />
                <View>
                    <Text style={{ textAlign: "center", marginTop: 8, fontWeight: "bold", marginBottom: 8 }}>R$ {item.price}</Text>
                    <Button title={"Adicionar Item"} onPress={onClick} />
                </View>
            </View>
        )
    }


    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => {
                alert("Erro ao carregar os produtos");
                console.error(error)
            });
    }, [])

    return (
        <>
            <Text style={{ textAlign: "center", paddingVertical: 24, fontWeight: "bold", fontSize: 24 }} >Lista de Produtos</Text>
            <View
                style={{
                    height: 1,
                    backgroundColor: "#4e1b4e",
                }}
            />
            <View style={{ flex: 1, display: "flex", flexDirection: "row", justifyContent: "center", alignContent: "center" }} >
                <FlatList data={data} renderItem={renderItem} horizontal={true} keyExtractor={(item) => item.id.toString()}
                    style={{ paddingTop: 28, paddingBottom: 24, marginTop: "auto", marginBottom: "auto" }} />
            </View>

        </>
    )
}

const styles = StyleSheet.create({
    card: {
        width: 250,
        height: 400,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: "#f0f0f0",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        marginHorizontal: 12,
    }
})