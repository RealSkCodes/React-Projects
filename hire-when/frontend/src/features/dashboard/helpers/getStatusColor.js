const getStatusColor = (status) => {
    switch (status) {
        case "Accepted":
            return "bg-green-500 text-white";
        case "Rejected":
            return "bg-red-500 text-white";
        default:
            return "bg-gray-500 text-white";
    }
};

export default getStatusColor;
