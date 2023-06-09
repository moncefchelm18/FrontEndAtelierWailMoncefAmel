import React, { useEffect, useState } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const DoughnutEquipmentsCondition = () => {
    const [equipmentData, setEquipmentData] = useState([]);

    useEffect(() => {
        axios
            .get("http://172.20.10.4:8000/inventory/")
            .then((response) => {
                setEquipmentData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const getConditionPercentage = () => {
        const conditions = equipmentData.map((equipment) => equipment.condition);
        const conditionCounts = conditions.reduce((countMap, condition) => {
            countMap[condition] = (countMap[condition] || 0) + 1;
            return countMap;
        }, {});

        const conditionLabels = Object.keys(conditionCounts);
        const conditionPercentages = conditionLabels.map(
            (condition) => (conditionCounts[condition] / equipmentData.length) * 100
        );

        const conditionCountLabels = conditionLabels.map((condition) => {
            const count = conditionCounts[condition];
            return `${condition} (${count})`; // Add count behind the condition label
        });

        const backgroundColors = conditionLabels.map((condition) => {
            if (condition === "good") return "rgba(0, 128, 0, 0.7)"; // Green for 'good'
            if (condition === "meduim") return "rgba(255, 165, 0, 0.7)"; // Orange for 'medium'
            if (condition === "poor") return "rgba(255, 0, 0, 0.7)"; // Red for 'poor'
            if (condition === "reserve") return "rgba(0, 0, 255, 0.7)"; // Blue for 'reserve'
            if (condition === "stolen") return "rgba(128, 128, 128, 0.7)"; // Grey for 'stolen'
            return "rgba(0, 0, 0, 0.6)"; // Black for unknown conditions
        });

        return {
            labels: conditionCountLabels, // Use conditionCountLabels instead of conditionLabels
            datasets: [
                {
                    data: conditionPercentages,
                    backgroundColor: backgroundColors,
                },
            ],
        };
    };

    const doughnutOptions = {
        plugins: {
            legend: {
                position: "right",
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const value = context.raw.toFixed(2);
                        return `${value}%`;
                    },
                },
            },
        },
        cutout: "70%", // Adjust the value to make the arc segments thinner or thicker
    };

    return (
        <>
            {equipmentData.length > 0 && (
                <div style={{ width: "300px", height: "300px" }}>
                    <Doughnut
                        data={getConditionPercentage()}
                        options={doughnutOptions}
                    />
                </div>
            )}
        </>
    );
};

export default DoughnutEquipmentsCondition;
