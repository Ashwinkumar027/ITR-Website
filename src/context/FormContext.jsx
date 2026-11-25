// src/context/FormContext.jsx
import React, { createContext, useContext, useState } from "react";

const FormContext = createContext();

export const useForm = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
    // Store all answers in a single flat object for simplicity across sections
    const [form, setForm] = useState({
        // Section 1: Basic Details
        interestedInService: "",
        fullName: "",
        email: "",
        taxYear: "2025-26",
        country_code: "+91",
        custom_country_code: "",
        mobileNumber: "",
        alt_country_code: "+91",
        alt_custom_country_code: "",
        altMobileNumber: "",
        annualIncome: "",

        // Section 2: Exit Reason
        reason: "",

        // Section 3: PAN Details
        pan_number: "",
        previouslyFiledWithAionion: "",

        // Section 4: Portal Info
        registeredOnIncomeTax: "",
        sharePassword: "",

        // Section 5: Password
        itPassword: "",

        // Section 6: Account Type
        account_type: "",

        // Section 7: Individual Details
        pan_name: "",
        father_name: "",
        gender: "",
        aadhaar: "",
        aadhaar_name: "",
        dob: "",
        comm_address: "",
        perm_address: "",

        // Section 8: HUF Details
        huf_pan: "",
        huf_pan_name: "",
        huf_formation_date: "",
        huf_comm_address: "",
        huf_perm_address: "",
        karta_pan: "",
        karta_name: "",
        karta_father: "",
        karta_gender: "",
        karta_dob: "",
        huf_mobile_number_placeholder: "", // Placeholder if needed
        hufMobileNumber: "",
        huf_email: "",

        // Section 9: Income (Salary)
        is_resident: "",
        has_salary: "",
        form16_available: "",

        // Section 10: House Property
        hasRentedHome: "",
        annualRent: "",
        housingLoan: "",
        loanUsage: "",

        // Section 11: Business & Other
        businessIncome: "",
        businessNature: "",
        gstAvailable: "",
        capitalGains: [],
        otherIncome: [],
        foreignAssets: "",
        otherDemat: "",
        cashDeposit: ""
    });

    // Store File objects separately
    const [files, setFiles] = useState({
        bankFile: null,
        hufBankFile: null,
        form16File: null,
        dematFile: null
    });

    const setField = (field, value) => {
        setForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const setFile = (fieldName, fileObj) => {
        setFiles(prev => ({
            ...prev,
            [fieldName]: fileObj
        }));
    };

    const resetForm = () => {
        setForm({
            interestedInService: "",
            fullName: "",
            email: "",
            taxYear: "2025-26",
            country_code: "+91",
            custom_country_code: "",
            mobileNumber: "",
            alt_country_code: "+91",
            alt_custom_country_code: "",
            altMobileNumber: "",
            reason: "",
            pan_number: "",
            previouslyFiledWithAionion: "",
            registeredOnIncomeTax: "",
            sharePassword: "",
            itPassword: "",
            account_type: "",
            pan_name: "",
            father_name: "",
            gender: "",
            aadhaar: "",
            aadhaar_name: "",
            dob: "",
            comm_address: "",
            perm_address: "",
            huf_pan: "",
            huf_pan_name: "",
            huf_formation_date: "",
            huf_comm_address: "",
            huf_perm_address: "",
            karta_pan: "",
            karta_name: "",
            karta_father: "",
            karta_gender: "",
            karta_dob: "",
            hufMobileNumber: "",
            huf_email: "",
            is_resident: "",
            has_salary: "",
            form16_available: "",
            hasRentedHome: "",
            annualRent: "",
            housingLoan: "",
            loanUsage: "",
            businessIncome: "",
            businessNature: "",
            gstAvailable: "",
            capitalGains: [],
            otherIncome: [],
            foreignAssets: "",
            otherDemat: "",
            cashDeposit: "",
            annualIncome: ""
        });
        setFiles({
            bankFile: null,
            hufBankFile: null,
            form16File: null,
            dematFile: null
        });
    };

    return (
        <FormContext.Provider value={{ form, setField, setForm, files, setFile, resetForm }}>
            {children}
        </FormContext.Provider>
    );
};
