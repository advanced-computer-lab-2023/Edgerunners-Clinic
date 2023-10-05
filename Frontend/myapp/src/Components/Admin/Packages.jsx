import React from "react";
import { ReactDOM } from "react-dom/client";

export default function Packages(){
    return (
    <div className="packages-container">
        <div className="health-care-packages">
            <div className="packages">
            <div className="package-title">
            <h1>Silver</h1>
            </div>
            <ul>
                <li>40% off any doctor session </li>
                <li>20% off any medicin ordered from pharmacy platform </li>
                <li>10% discount on subscription of any family member </li>
                <li className="package-price">3600 LE</li>
            </ul>
            </div>
            <div className="packages">
            <div className="package-title">
            <h1>Gold</h1>
            </div>
            <ul>
                <li>60% off any doctor session </li>
                <li>30% off any medicin ordered from pharmacy platform </li>
                <li>15% discount on subscription of any family member </li>
                <li className="package-price">6000 LE</li>
            </ul>
            </div>
            <div className="packages">
            <div className="package-title">
            <h1>Platinum</h1>
            </div>
            <ul>
                <li>80% off any doctor session </li>
                <li>40% off any medicin ordered from pharmacy platform </li>
                <li>20% discount on subscription of any family member </li>
                <li className="package-price">9000 LE</li>
            </ul>
            </div>
            
        </div>
        
     </div>
    )
}