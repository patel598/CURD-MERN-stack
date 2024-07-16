
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { Box } from "@mui/material";
import { motion } from "framer-motion"

import "./index.css"
import { pageTransition, pageVariants } from "../../../Utils/animaton";

const LoginLayout = () => {

        let user = localStorage.getItem("atk");
        const { pathname } = useLocation();


        return (
                <motion.div
                        key={pathname}
                        initial="initial"
                        animate="in"
                        variants={pageVariants}
                        transition={pageTransition}
                        className="registration_layout"
                >
                        {/* <Box component="main" className="registration_layout"> */}
                        {user ? <Navigate to="/dashboard/product" /> : <Outlet />}
                        {/* </Box> */}
                </motion.div>

        )
}

export default LoginLayout