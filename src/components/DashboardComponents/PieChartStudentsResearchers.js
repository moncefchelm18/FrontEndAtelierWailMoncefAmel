import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
const PieChartStudentsResearchers = () => {
    const [allocationData, setAllocationData] = useState([]);
    const [studentsData, setStudentsData] = useState([]);
    const [researchersData, setResearchersData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalUserCount, setTotalUserCount] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const allocateResponse = await axios.get(
                    "http://172.20.10.4:8000/allocate/"
                );
                const studentsResponse = await axios.get(
                    "http://172.20.10.4:8000/profiles/Student/"
                );
                const researchersResponse = await axios.get(
                    "http://172.20.10.4:8000/profiles/Researcher/"
                );

                setAllocationData(allocateResponse.data);
                setStudentsData(studentsResponse.data);
                setResearchersData(researchersResponse.data);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const getAllocationPercentage = () => {
        const allocatedCount = allocationData.filter(
            (allocation) => allocation.Reserved_by
        ).length;
        const totalUsersCount = studentsData.length + researchersData.length;
        const unallocatedCount = totalUsersCount - allocatedCount;
        return {
            labels: ["Allocated", "Not Allocated"],
            datasets: [
                {
                    data: [allocatedCount, unallocatedCount],
                    backgroundColor: ["rgba(0, 128, 0, 0.7)", "rgba(255, 0, 0, 0.7)"],
                },
            ],
        };
    };

    const pieOptions = {
        plugins: {
            legend: {
                position: "right",
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const value = context.raw.toFixed(0);

                        return `${value}`;
                    },
                },
            },
        },
    };

    return (
        <>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div style={{ width: "300px", height: "300px" }}>
                    <Pie data={getAllocationPercentage()} options={pieOptions} />
                </div>
            )}
        </>
    );
};

export default PieChartStudentsResearchers;
