import React from "react";
import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";
import { get } from "lodash";

const styles = StyleSheet.create({
    page: {
        fontFamily: "Helvetica",
        fontSize: 8,
        padding: 10,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    title: {
        fontSize: 15,
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 12,
        fontStyle: "italic",
    },
    date: {
        fontSize: 10,
    },
    logo: {
        width: 50,
        height: 50,
    },
    table: {
        display: "table",
        width: "auto",
        borderStyle: "solid",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    tableRow: {
        flexDirection: "row",
    },
    tableHeader: {
        width: "25%",
        borderStyle: "solid",
        fontSize: 10,
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 1,
        fontWeight: "bold", // Added style for bold font weight
    },
    tableCell: {
        width: "25%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 1,
    },
});

const InfosTablePDF = ({ columnTitles, data, columnMappings, searchValue }) => {
    // Filter the data based on the search value
    const filteredData = data.filter((item) =>
        Object.values(item).some(
            (value) =>
                typeof value === "string" &&
                value.toLowerCase().includes(searchValue.toLowerCase().trim())
        )
    );

    // Get the current date and format it as a string
    const currentDate = new Date().toLocaleDateString();

    return (
        <Document>
            <Page style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.title}>Inventory Reports</Text>
                    <Text style={styles.date}>Created on: {currentDate}</Text>
                </View>
                <View style={styles.header}>
                    <Text style={styles.subtitle}>University Constantine 2 Abdelhamid Mehri</Text>
                    <Image
                        src={"../playground_assets/images/university2-logo.png"}
                        style={styles.logo}
                    />
                </View>
                <View style={styles.table}>
                    {/* Render column titles */}
                    <View style={styles.tableRow}>
                        {columnTitles.map((title, index) => (
                            title !== "IMG" &&
                            title !== "Reserved" &&
                            title !== "Description" && (
                                <View key={index} style={styles.tableHeader}>
                                    <Text>{title}</Text>
                                </View>
                            )
                        ))}
                    </View>
                    {/* Render data */}
                    {filteredData.map((datas) => (
                        <View key={datas.id} style={styles.tableRow}>
                            {columnTitles.map((title, index) => (
                                title !== "IMG" &&
                                title !== "Reserved" &&
                                title !== "Description" && (
                                    <View key={index} style={styles.tableCell}>
                                        <Text>{get(datas, columnMappings[title])}</Text>
                                    </View>
                                )
                            ))}
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    );
};

export default InfosTablePDF;
