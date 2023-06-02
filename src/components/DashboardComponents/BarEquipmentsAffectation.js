import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
const BarEquipmentsAffectation = () => {
    const [stockData, setStockData] = useState([]);
    const [inventoryData, setInventoryData] = useState([]);
    const [reservedData, setReservedData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const stockResponse = await axios.get(
                    "http://127.0.0.1:8000/equipement/"
                );
                const inventoryResponse = await axios.get(
                    "http://127.0.0.1:8000/inventory/"
                );

                setStockData(stockResponse.data);
                setInventoryData(inventoryResponse.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const reservedEquipments = inventoryData.filter(
            (equipment) => equipment.is_reserved === true
        );
        setReservedData(reservedEquipments);
    }, [stockData]);

    const getEquipmentCounts = () => {
        const stockCount = stockData.length;
        const inventoryCount = inventoryData.length;
        const reservedCount = reservedData.length;

        return [stockCount, inventoryCount, reservedCount];
    };

    const barData = {
        labels: ["Stock", "Inventory", "Reserved"],
        datasets: [
            {
                label: "Equipments",
                data: getEquipmentCounts(),
                backgroundColor: [
                    "rgba(0, 128, 0, 0.7)", // Green for 'Stock'
                    "rgba(255, 0, 0, 0.7)", // Red for 'Inventory'
                    "rgba(0, 0, 255, 0.7)", // Blue for 'Reserved'
                ],
            },
        ],
    };

    const barOptions = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
        elements: {
            bar: {
                borderWidth: 1, // Adjust the border width as desired
                borderRadius: 10, // Adjust the border radius as desired
                barThickness: 'flex', // Adjust the bar thickness as desired (you can also use a number for fixed thickness)
            },
        },
    };


    return (
        <>
            <Bar data={barData} options={barOptions} />
        </>
    );
};

export default BarEquipmentsAffectation;
