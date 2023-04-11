require("dotenv").config();
export default {
    extra: {
        REACT_APP_SERVER_IP: process.env.REACT_APP_SERVER_IP,
        REACT_APP_SERVER_PORT: process.env.REACT_APP_SERVER_PORT,
    }
}

