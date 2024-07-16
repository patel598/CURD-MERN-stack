/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react/prop-types */
// import "./cabmanlayout.css";
import React from "react";
import { motion } from "framer-motion"
import {
    Box
} from "@mui/material";

import "./index.css"

import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "../../navbar";
import { pageTransition, pageVariants } from "../../../Utils/animaton";







export default function DashboardLayout() {

    let user = localStorage.getItem("atk");
    const {pathname} = useLocation();


    return (
        <>
            <Navbar />
            <motion.div
                key={pathname}
                initial="initial"
                animate="in"
                variants={pageVariants}
                transition={pageTransition}
                style={{ position: 'relative', height: 'calc(100dvh - 51px)', padding: '20px 10px' }}
            >
                {/* <Box sx={{ position: 'relative', height: 'calc(100dvh - 51px)', padding: '20px 10px' }}> */}
                    <Box component="main"
                        className="parent_height"
                        sx={{
                            flexGrow: 1,
                            width: '100%',
                            background: "#ffffff",
                            maxHeight: 'calc(100dvh - 120px)',

                        }} >

                        {
                            user ? <Outlet /> : <Navigate to="/login" />
                        }

                    </Box>
                {/* </Box> */}
            </motion.div>

        </>
    );
}

