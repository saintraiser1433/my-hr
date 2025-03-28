import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import "~/assets/fonts/oldenglishtextmt-bold.js";
import "~/assets/fonts/tahoma-normal.js";
import "~/assets/fonts/tahoma-bold.js";
import seait from "/logo/seait.png";
export const usePrintTeamResult = () => {
  const doc = new jsPDF({
    unit: "px",
    orientation: "p",
    format: "legal",
  });



  const leftMargin = 40;
  const rightMargin = doc.internal.pageSize.width - 40;
  const centerX = doc.internal.pageSize.width / 2;
  const contentWidth = rightMargin - leftMargin;
  const fullWidth = doc.internal.pageSize.width;
  // Header Section

  //initial page
  doc.addImage(seait, "PNG", 50, 18, 40, 40);
  doc.setFont("oldenglishtextmt", "bold").setFontSize(16).setTextColor(0, 100, 0);
  doc.text("South East Asian Institute of Technology, Inc.", centerX, 30, { align: "center" });
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(8).setTextColor(0, 100, 0);
  doc.text("National Highway, Barangay Crossing Rubber, Tupi, South Cotabato", 225, 40, { align: "center" });
  doc.text("Tel No. (083) 226-1202   EMAIL ADDRESS: seaitinc@yahoo.com", 218, 50, { align: "center" });
  doc.setDrawColor(0, 100, 0); // RGB Green

  doc.line(0, 60, fullWidth, 60);
  doc.setDrawColor(0, 0, 0); // RGB Green


  // Title
  doc.setFont("Helvetica", "bold").setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text("EMPLOYEE PERFORMANCE APPRAISAL FORM", centerX, 90, { align: "center" });

  doc.setFont("Helvetica", "bold").setFontSize(10);
  doc.text("(Confidential)", centerX, 100, { align: "center" });

  doc.setFont("Helvetica", "normal").setFontSize(10);
  doc.text(
    "Employee Performance Appraisal shall be conducted periodically and designed to measure the effectiveness of South East Asian Institute of Technology Inc. Employee in performing his assigned duties & responsibilities. This shall also serve as a tool in pinpointing their performance deficiencies.",
    leftMargin + 10, 120, { maxWidth: contentWidth - 20, align: "justify" }
  );

  doc.text(
    "Employees shall be rated using the range of 5 to 1 as 5 as the highest rating and 1 as the lowest rating.",
    leftMargin + 10, 155, { maxWidth: contentWidth - 20, align: "justify" }
  );

  doc.setFont("Helvetica", "bold");
  doc.text("5 – Outstanding", leftMargin + 50, 180);
  doc.text("4 – Very Satisfactory", leftMargin + 50, 190);
  doc.text("3 – Satisfactory", leftMargin + 50, 200);
  doc.text("2 – Poor", leftMargin + 50, 210);
  doc.text("1 – Fail", leftMargin + 50, 220);

  // Employee Information Section
  doc.line(leftMargin, 240, rightMargin, 240);
  doc.setFont("Helvetica", "normal").setFontSize(10);
  doc.text("Name of Employee:", leftMargin + 10, 260);
  doc.line(leftMargin + 130, 260, rightMargin - 10, 260);

  doc.text("Position:", leftMargin + 10, 275);
  doc.line(leftMargin + 130, 278, rightMargin - 10, 278);

  doc.text("No. of Years in Position:", leftMargin + 10, 290);
  doc.line(leftMargin + 130, 293, rightMargin - 10, 293);

  doc.text("Department:", leftMargin + 10, 305);
  doc.line(leftMargin + 130, 308, rightMargin - 10, 308);

  doc.text("Rating Period:", leftMargin + 10, 320);
  doc.line(leftMargin + 130, 323, rightMargin - 10, 323);

  // Summary of Rating
  doc.setFont("Helvetica", "bold").setFontSize(12);
  doc.text("SUMMARY OF RATING", centerX, 350, { align: "center" });

  doc.setFont("Helvetica", "normal").setFontSize(10);
  doc.text("Numerical Rating:", leftMargin + 100, 380);
  doc.line(220, 380, rightMargin - 100, 380); // Line for numerical rating

  doc.text("Adjective Rating:", leftMargin + 100, 400);
  doc.line(220, 402, rightMargin - 100, 402); // Line for numerical rating

  doc.addPage();

  // looping station
  doc.addImage(seait, "PNG", 50, 18, 40, 40);
  doc.setFont("oldenglishtextmt", "bold").setFontSize(16).setTextColor(0, 100, 0);
  doc.text("South East Asian Institute of Technology, Inc.", centerX, 30, { align: "center" });
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(8).setTextColor(0, 100, 0);

  doc.text("National Highway, Barangay Crossing Rubber, Tupi, South Cotabato", 225, 40, { align: "center" });
  doc.text("Tel No. (083) 226-1202   EMAIL ADDRESS: seaitinc@yahoo.com", 218, 50, { align: "center" });
  doc.setDrawColor(0, 100, 0); // RGB Green

  doc.line(0, 60, fullWidth, 60);
  doc.setDrawColor(0, 0, 0); // RGB Green


  // Title

  doc.setFont("Helvetica", "bold").setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text("A. Performance", leftMargin, 90, { align: "left" });
  doc.setFont("Helvetica", "bold").setFontSize(8);
  const columns = ['Function/Specific Tasks', '1-Fail', '2-Poor', '3-Satisfactory', '4-Very Satisfactory', '5-Outstanding'];

  // Table rows
  const rows = [
    ["Can you tell me about the important people in your life?", '/'],
    ["What have been some of the happiest moments in your life? The saddest?"],
    ["Who has been the biggest influence on your life? What lessons did that person or those people teach you?"],
  ];

  // Add title

  // Add autoTable
  autoTable(doc, {
    head: [columns], // Table headers
    body: rows, // Table rows
    startY: 100, // Position of the table
    styles: {
      fontSize: 8, // Change this to your desired font size
      font: 'Helvetica',
      lineWidth: 0.5, // Border thickness
      lineColor: [0, 0, 0], // Black border color
    },
    tableLineColor: [0, 0, 0], // Border color for the whole table
    tableLineWidth: 0.5,
    columnStyles: {
      0: { cellWidth: 150 }, // Wider first column for text wrapping

    },
    headStyles: {
      fontSize: 8, // Font size for headers
      fillColor: [22, 160, 133], // Custom header background color
      textColor: [255, 255, 255] // White text colors
    },
    bodyStyles: {
      fontSize: 8, // Font size for table rows
    },

  });


  doc.addPage();

  //summary
  doc.addImage(seait, "PNG", 50, 18, 40, 40);
  doc.setFont("oldenglishtextmt", "bold").setFontSize(16).setTextColor(0, 100, 0);
  doc.text("South East Asian Institute of Technology, Inc.", centerX, 30, { align: "center" });
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(8).setTextColor(0, 100, 0);
  doc.text("National Highway, Barangay Crossing Rubber, Tupi, South Cotabato", 225, 40, { align: "center" });
  doc.text("Tel No. (083) 226-1202   EMAIL ADDRESS: seaitinc@yahoo.com", 218, 50, { align: "center" });
  doc.setDrawColor(0, 100, 0); // RGB Green

  doc.line(0, 60, fullWidth, 60);
  doc.setDrawColor(0, 0, 0); // RGB Green

  //end header
  doc.setFontSize(12).setFont("Helvetica", "bold").setTextColor(0, 0, 0);;

  doc.text("SUMMARY OF RATING", centerX, 90, { align: "center" });

  // Horizontal line below header

  doc.line(leftMargin, 100, rightMargin, 100);
  // Line thickness
  // Performance Factors Section
  doc.setFont("Helvetica", "bold").setFontSize(10);
  doc.text("I. OBJECTIVE PERFORMANCE", leftMargin, 120);

  doc.setFont("Helvetica", "normal");
  const col1 = leftMargin + 10, col2 = rightMargin - 90, col3 = rightMargin - 10;

  doc.text("PERFORMANCE FACTORS", col1, 135);
  doc.text("70%", col2, 135);
  doc.text("59.27", col3, 135, { align: "right" });

  doc.text("II. EMPLOYEE SOFT SKILL", col1, 150);
  doc.text("30%", col2, 150);
  doc.text("25.77", col3, 150, { align: "right" });

  // Horizontal line below performance factors
  doc.line(leftMargin, 170, rightMargin, 170);

  // Legend Section
  doc.text("Legend:", leftMargin, 190);
  ["5 – Outstanding", "4 – 4.99 Very Satisfactory", "3 – 3.99 Satisfactory", "2 – 2.99 Poor", "1 – 1.99 Fail"]
    .forEach((text, i) => doc.text(text, leftMargin + 20, 205 + i * 15));

  // Recommended Areas for Improvement
  doc.text("Recommended Areas for Improvement:", leftMargin, 290);
  for (let i = 0; i < 4; i++) {
    doc.line(leftMargin, 310 + i * 20, rightMargin, 310 + i * 20);
  }

  // Signature Section
  const signatureYStart = 420;
  const signatureWidth = (contentWidth - 20) / 2;

  // Ratee's Signature (left)

  doc.line(leftMargin, signatureYStart, leftMargin + signatureWidth, signatureYStart);
  doc.text("Ratees' Signature", leftMargin, signatureYStart + 10);

  doc.line(leftMargin, signatureYStart + 30, leftMargin + signatureWidth, signatureYStart + 30);
  doc.text("Signature over Printed Name", leftMargin, signatureYStart + 40);


  doc.line(leftMargin, signatureYStart + 60, leftMargin + signatureWidth, signatureYStart + 60);
  doc.text("Date", leftMargin, signatureYStart + 70);
  // Rater's Signature (right)

  doc.line(leftMargin + signatureWidth + 20, signatureYStart, rightMargin, signatureYStart);
  doc.text("Raters' Signature", leftMargin + signatureWidth + 20, signatureYStart + 10);

  doc.setFont("Helvetica").setFontSize(8);
  doc.line(leftMargin + signatureWidth + 20, signatureYStart + 30, rightMargin, signatureYStart + 30);
  doc.text("Signature over Printed Name of Immediate Supervisor/Dept. Head",
    leftMargin + signatureWidth + 20, signatureYStart + 40, { maxWidth: signatureWidth });

  doc.setFont("Helvetica").setFontSize(10);
  doc.line(leftMargin + signatureWidth + 20, signatureYStart + 60, rightMargin, signatureYStart + 60);
  doc.text("Position", leftMargin + signatureWidth + 20, signatureYStart + 70);
  // Noted By Section
  const notedByYStart = 600;
  const notedByWidth = 250;

  doc.text("Noted by:", centerX, notedByYStart - 50, { align: "center" });


  doc.setFont("Helvetica", "bold");
  doc.text("ENGR. MILAGROS S. TAMAYO, MIM", centerX, notedByYStart + 35, { align: "center" });

  doc.setFont("Helvetica", "normal");
  doc.text("Vice President for Admin and Finance", centerX, notedByYStart + 55, { align: "center" });
  doc.text("Human Resource Development Officer", centerX, notedByYStart + 75, { align: "center" });

  // Date line centered
  doc.line(centerX - (notedByWidth / 2), notedByYStart + 110, centerX + (notedByWidth / 2), notedByYStart + 110);
  doc.text("Date", centerX, notedByYStart + 120, { align: "center" });

  window.open(doc.output("bloburl"));
};
