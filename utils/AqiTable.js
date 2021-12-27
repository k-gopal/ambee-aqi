const Ivalue = {
    "0-50": {
        low: 0,
        high: 50
    },
    "51-100": {
        low: 50,
        high: 100
    },"101-200": {
        low: 100,
        high: 200
    },"201-300": {
        low: 200,
        high: 300
    },"301-400": {
        low: 300,
        high: 400
    },"401-500": {
        low: 400,
        high: 500
    }
};

const Bvalue = {
    "CO": {
        low: 1,
        high: 34
    },
    "N2O": {
        low: 40,
        high: 400
    },
    "PM10": {
        low: 50,
        high: 430
    },
    "PM2.5": {
        low: 30,
        high: 250
    },
    "O3": {
        low: 50,
        high: 748
    },
    "SO2": {
        low: 40,
        high: 1600
    },
    "NH3": {
        low: 200,
        high: 1800
    },
    "PB": {
        low: 0.5,
        high: 3.5
    },
}

const AqiCategory = {
    "0-50": {
        color: "green",
        statement: "Air quality is satisfactory, and air pollution poses little or no risk.",
        concern: "Good"
    },
    "51-100": {
        color: "yellow",
        statement: "Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.",
        concern: "Moderate"
    },
    "101-200": {
        color: "orange",
        statement: "Members of sensitive groups may experience health effects. The general public is less likely to be affected.",
        concern: "Unhealthy for Sensitive Groups"
    },
    "201-300": {
        color: "red",
        statement: "Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.",
        concern: "Unhealthy"
    },
    "301-400": {
        color: "purple",
        statement: "Health alert: The risk of health effects is increased for everyone.",
        concern: "Very Unhealthy"
    },
    "401-500": {
        color: "maroon",
        statement: "Health warning of emergency conditions: everyone is more likely to be affected.",
        concern: "Hazardous"
    }
}

export {
    AqiCategory,
    Ivalue,
    Bvalue
}