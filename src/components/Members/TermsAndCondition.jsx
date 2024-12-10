import React, { useState } from "react";
import Heading from "../Headings/Headings";

export default function TermsAndCondition() {


  const termsAndCondition = [
    {
      condtion: "Conditions of use",
      description:
        "By using this website, you certify that you have read and reviewed this Agreement and that you agree to comply with its terms. If you do not want to be bound by the terms of this Agreement, you are advised to stop using the website accordingly. SIP only grants use and access of this website, its products, and its services to those who have accepted its terms.",
    },
    {
      condtion: "Privacy policy",
      description:
        "Before you continue using our website, we advise you to read our privacy policy [link to privacy policy] regarding our user data collection. It will help you better understand our practices.",
    },
    {
      condtion: "Age Restriction",
      description:
        "You must be at least 18 (eighteen) years of age before you can use this website. By using this website, you warrant that you are at least 18 years of age and you may legally adhere to this Agreement. SIP assumes no responsibility for liabilities related to age misrepresentation.",
    },
    {
      condtion: "Intellectual property",
      description:
        "You agree that all materials, products, and services provided on this website are the property of SIP, its affiliates, directors, officers, employees, agents, suppliers, or licensors including all copyrights, trade secrets, trademarks, patents, and other intellectual property. You also agree that you will not reproduce or redistribute the SIP's intellectual property in any way, including electronic, digital, or new trademark registrations. You grant SIP a royalty-free and non-exclusive license to display, use, copy, transmit, and broadcast the content you upload and publish. For issues regarding intellectual property claims, you should contact the company in order to come to an agreement.",
    },
    {
      condtion: "User accounts",
      description:
        "As a user of this website, you may be asked to register with us and provide private information. You are responsible for ensuring the accuracy of this information, and you are responsible for maintaining the safety and security of your identifying information. You are also responsible for all activities that occur under your account or password. If you think there are any possible issues regarding the security of your account on the website, inform us immediately so we may address them accordingly. We reserve all rights to terminate accounts, edit or remove content and cancel orders at our sole discretion.",
    },
    {
      condtion: "Applicable law",
      description:
        "By using this website, you agree that the laws of the [your location], without regard to principles of conflict laws, will govern these terms and conditions, or any dispute of any sort that might come between SIP and you, or its business partners and associates.",
    },
    {
      condtion: "Disputes",
      description:
        "Any dispute related in any way to your use of this website or to products you purchase from us shall be arbitrated by state or federal court [your location] and you consent to exclusive jurisdiction and venue of such courts.",
    },
    {
      condtion: "Indemnification",
      description:
        "You agree to indemnify SIP and its affiliates and hold SIP harmless against legal claims and demands that may arise from your use of our services. We reserve the right to select our own legal counsel.",
    },
    {
      condtion: "Limitation on liability",
      description:
        "SIP is not liable for any damages that may occur to you as a result of your misuse of our website. SIP reserves the right to edit, modify, and change this Agreement at any time. We shall let our users know of these changes through electronic mail. This Agreement is an understanding between SIP and the user, and this supersedes and replaces all prior agreements regarding the use of this website.",
    },
  ];

  return (
    <div className="p-3 container mx-auto" >
      <div className="text-center my-3">
        <Heading text="Terms & Conditions" color="default" />
      </div>

      <div className="space-y-8  ">
        {termsAndCondition.map((itm, ind) => (
          <section className="space-y-3" key={ind}>
            <h3 className="font-semibold text-lg">{itm.condtion}</h3>
            <p className="text-gray-800  ">{itm.description}</p>
          </section>
        ))}
      </div>

      
    </div>
  );
}
