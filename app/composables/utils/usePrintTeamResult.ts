import { jsPDF } from "jspdf";
import autoTable, { type HAlignType } from 'jspdf-autotable';
import "~/assets/fonts/oldenglishtextmt-bold.js";
import "~/assets/fonts/tahoma-normal.js";
import "~/assets/fonts/tahoma-bold.js";
import seait from "/logo/seait.png";

export const usePrintTeamResult = (data: EmployeeRating[]) => {
  // ======================
  // Initial Setup
  // ======================
  if (!data || data.length === 0 || !data[0]) {
    console.error("No employee rating data provided");
    return;
  }

  // PDF Document Configuration
  const doc = new jsPDF({
    unit: "px",
    orientation: "p",
    format: "legal",
  });

  // Layout Constants
  const leftMargin = 40;
  const rightMargin = 40;
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const contentWidth = pageWidth - leftMargin - rightMargin;
  const headerHeight = 90;
  const footerHeight = 40;
  const centerX = doc.internal.pageSize.width / 2;
  const leftMarginSummary = 40;
  const rightMarginSummary = doc.internal.pageSize.width - 40;
  let yPosition = 180;
  const templateSpacing = 10;
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).toUpperCase().replace(/ /g, '-');

  // Signature Section Constants
  const signatureYStart = 420;
  const contentWidthSummary = rightMarginSummary - leftMarginSummary;
  const signatureWidth = (contentWidthSummary - 20) / 2;

  // ======================
  // Helper Functions
  // ======================
  const addHeader = () => {
    doc.addImage(seait, "PNG", 50, 18, 40, 40);
    doc.setFont("oldenglishtextmt", "bold").setFontSize(16).setTextColor(0, 100, 0);
    doc.text("South East Asian Institute of Technology, Inc.", pageWidth / 2, 30, { align: "center" });
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(8).setTextColor(0, 100, 0);
    doc.text("National Highway, Barangay Crossing Rubber, Tupi, South Cotabato", pageWidth / 2, 40, { align: "center" });
    doc.text("Tel No. (083) 226-1202   EMAIL ADDRESS: seaitinc@yahoo.com", pageWidth / 2, 50, { align: "center" });
    doc.setDrawColor(0, 100, 0);
    doc.line(0, 60, pageWidth, 60);
    doc.setDrawColor(0, 0, 0);
  };

  // ======================
  // Initial Page Content
  // ======================
  addHeader();

  // Prepare template data
  const sortedInitialTemplate = [...data[0].template]
    .sort((a, b) => b.score - a.score)
    .map(t => ({
      ...t,
      title: t.title
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
    }));

  const scores = data[0].template.map(t => t.score);
  const maxScore = Math.max(...scores);
  const minScore = Math.min(...scores);

  // Title Section
  doc.setFont("Helvetica", "bold").setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text("EMPLOYEE PERFORMANCE APPRAISAL FORM", centerX, 90, { align: "center" });

  doc.setFont("Helvetica", "bold").setFontSize(10);
  doc.text("(Confidential)", centerX, 100, { align: "center" });

  // Introduction Text
  doc.setFont("Helvetica", "normal").setFontSize(10);
  doc.text(
    "Employee Performance Appraisal shall be conducted periodically and designed to measure the effectiveness of South East Asian Institute of Technology Inc. Employee in performing his assigned duties & responsibilities. This shall also serve as a tool in pinpointing their performance deficiencies.",
    leftMarginSummary + 10, 120, { maxWidth: contentWidth - 20, align: "justify" }
  );

  doc.text(
    `Employees shall be rated using the range of ${maxScore} to ${minScore} as ${maxScore} as the highest rating and ${minScore} as the lowest rating.`,
    leftMarginSummary + 10, 155, { maxWidth: contentWidth - 20, align: "justify" }
  );

  // Rating Scale
  sortedInitialTemplate.forEach(template => {
    doc.setFont("Helvetica", "bold");
    doc.text(`${template.score} – ${template.title}`, leftMarginSummary + 50, yPosition);
    yPosition += templateSpacing;
  });

  // Employee Information Section
  doc.line(leftMarginSummary, 240, rightMarginSummary, 240);
  doc.setFont("Helvetica", "normal").setFontSize(10);

  // Name of Employee
  doc.text("Name of Employee:", leftMarginSummary + 10, 260);
  doc.text(data[0].name, leftMarginSummary + 130, 258);
  doc.line(leftMarginSummary + 130, 260, rightMarginSummary - 10, 260);

  // Position
  // doc.text("Position:", leftMarginSummary + 10, 275);
  // doc.line(leftMarginSummary + 130, 278, rightMarginSummary - 10, 278);

  // Years in Position
  // doc.text("No. of Years in Position:", leftMarginSummary + 10, 290);
  // doc.line(leftMarginSummary + 130, 293, rightMarginSummary - 10, 293);

  // Department
  doc.text("Department:", leftMarginSummary + 10, 275);
  doc.text(data[0].departmentName, leftMarginSummary + 130, 273);
  doc.line(leftMarginSummary + 130, 275, rightMarginSummary - 10, 275);

  // Rating Period
  // doc.text("Rating Period:", leftMarginSummary + 10, 320);
  // doc.line(leftMarginSummary + 130, 323, rightMarginSummary - 10, 323);

  // Summary Rating
  doc.setFont("Helvetica", "bold").setFontSize(12);
  doc.text("SUMMARY OF RATING", centerX, 320, { align: "center" });

  // Numerical Rating
  doc.setFont("Helvetica", "normal").setFontSize(10);
  doc.text("Numerical Rating:", leftMarginSummary + 100, 340);
  doc.text(data[0]?.summaryRating?.rating?.toFixed(2) || "N/A", 260, 337);
  doc.line(220, 340, rightMarginSummary - 100, 340);

  // Adjective Rating
  const capitalizedAdjective = (data[0].summaryRating?.adjectiveRating ?? "")
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  doc.text("Adjective Rating:", leftMargin + 100, 355);
  doc.text(capitalizedAdjective, 248, 351);
  doc.line(220, 355, rightMarginSummary - 100, 355);

  doc.addPage();

  // ======================
  // Category Pages (Looping Table)
  // ======================
  const sortedTemplate = data[0].template
    ? [...data[0].template]
      .sort((a, b) => a.score - b.score)
      .map(t => ({
        ...t,
        title: t.title
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ')
      }))
    : [];

  // Group questions by category and criteria
  const groupedData: Record<string, Record<string, any[]>> = {};

  if (data[0]?.answersData) {
    data[0].answersData.forEach(answer => {
      if (!answer?.category) return;

      if (!groupedData[answer.category]) {
        groupedData[answer.category] = {};
      }

      const categoryGroup = groupedData[answer.category];
      const criteria = answer.criteria || 'General';

      if (categoryGroup) {
        categoryGroup[criteria] = categoryGroup[criteria] || [];
        categoryGroup[criteria].push(answer);
      }
    });
  }

  // Process each category
  const sortedCategories = Object.keys(groupedData).sort();
  let categoryLetter = 'A'.charCodeAt(0);

  for (const category of sortedCategories) {
    if (categoryLetter > 'A'.charCodeAt(0)) {
      doc.addPage();
    }

    let startY = headerHeight;
    addHeader();

    const criteriaData = groupedData[category] ?? {};
    const categoryPrefix = `${String.fromCharCode(categoryLetter)}.`;

    // Category title
    doc.setFont("Helvetica", "bold").setFontSize(12).setTextColor(0, 0, 0);
    doc.text(`${categoryPrefix} ${category.toUpperCase()}`, leftMargin, startY);
    startY += 10;

    // Prepare table data
    const columns = [
      { header: 'CRITERIA', dataKey: 'criteria' },
      ...sortedTemplate.map(t => ({
        header: `${t.score}`,
        dataKey: t.title
      }))
    ];

    const tableData: any[] = [];
    let criteriaCounter = 0;
    let questionCounter = 0;

    for (const [criteria, questions] of Object.entries(criteriaData)) {
      criteriaCounter++;
      questionCounter = 0;

      // Add criteria row
      const criteriaRow: any = {
        criteria: `${criteriaCounter}. ${criteria}`,
        _isCriteria: true
      };
      sortedTemplate.forEach(t => (criteriaRow[t.title] = ''));
      tableData.push(criteriaRow);

      // Add questions
      questions.forEach(question => {
        questionCounter++;
        const cleanQuestion = question.question.replace(/<[^>]*>/g, '').trim();
        const questionRow: any = {
          criteria: `   ${criteriaCounter}.${questionCounter} ${cleanQuestion}`,
          _isQuestion: true
        };
        sortedTemplate.forEach(t => {
          questionRow[t.title] =
            question.templateDetailTitle?.toLowerCase() === t.title?.toLowerCase()
              ? 'X'
              : '';
        });
        tableData.push(questionRow);
      });
    }

    // Table configuration
    const firstColWidth = 180;
    const remainingWidth = contentWidth - firstColWidth;
    const ratingColWidth = remainingWidth / sortedTemplate.length;

    autoTable(doc, {
      head: [columns.map(c => c.header)],
      body: tableData.map(row => [
        {
          content: row.criteria,
          styles: {
            cellWidth: firstColWidth,
            fontStyle: row._isCriteria ? 'bold' : 'normal',
            valign: 'middle'
          }
        },
        ...sortedTemplate.map(t => ({
          content: row[t.title],
          styles: {
            halign: 'center' as HAlignType,
            cellWidth: ratingColWidth
          }
        }))
      ]),
      startY,
      margin: { left: leftMargin, right: rightMargin, top: startY, bottom: footerHeight },
      tableWidth: contentWidth,
      styles: {
        fontSize: 10,
        font: 'Helvetica',
        lineWidth: 0.5,
        lineColor: [0, 0, 0],
        cellPadding: { top: 3, right: 2, bottom: 3, left: 2 },
        overflow: 'linebreak',
      },
      columnStyles: {
        0: {
          cellWidth: firstColWidth,
          valign: 'middle'
        },
        ...Object.fromEntries(sortedTemplate.map((_, i) => [i + 1, {
          cellWidth: ratingColWidth,
          halign: 'center'
        }]))
      },
      headStyles: {
        fontSize: 10,
        fillColor: [22, 160, 133],
        textColor: [255, 255, 255],
        halign: 'center',
      },
      bodyStyles: {
        fontSize: 10,
        textColor: [0, 0, 0],
        cellPadding: { top: 3, right: 2, bottom: 3, left: 2 },
      },
    });

    categoryLetter++;
  }

  // ======================
  // Final Summary Page
  // ======================
  doc.addPage();
  addHeader();
  doc.setFontSize(12).setFont("Helvetica", "bold").setTextColor(0, 0, 0);

  doc.text("SUMMARY OF RATING", centerX, 90, { align: "center" });
  doc.line(leftMarginSummary, 100, rightMarginSummary, 100);

  // Performance Factors
  doc.setFont("Helvetica", "bold").setFontSize(10);
  doc.text("I. OBJECTIVE PERFORMANCE", leftMarginSummary, 120);

  doc.setFont("Helvetica", "normal");
  const col1 = leftMarginSummary + 10, col2 = rightMarginSummary - 90, col3 = rightMarginSummary - 10;

  // Rating Categories
  let yPositionSummary = 135;
  let totalWeightedScore = 0;

  data[0].rating.forEach((category) => {
    const weightedScore = category.ratingPercentage ?? 0;
    totalWeightedScore += weightedScore;

    const capitalizedCategory = category.categoryName
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

    doc.text(capitalizedCategory, col1, yPositionSummary);
    doc.text(`${(category.percentage * 100).toFixed(0)}%`, col2, yPositionSummary);
    doc.text(`${(category.ratingPercentage ?? 0).toFixed(2)}%`, col3, yPositionSummary, { align: "right" });
    yPositionSummary += 15;
  });

  // Total Rating
  doc.setFont("Helvetica", "bold");
  doc.text("TOTAL RATING", col1, yPositionSummary);
  doc.text("100%", col2, yPositionSummary);
  doc.text(`${totalWeightedScore.toFixed(2)}%`, col3, yPositionSummary, { align: "right" });

  // Legend
  yPositionSummary += 10;
  doc.line(leftMarginSummary, yPositionSummary, rightMarginSummary, yPositionSummary);

  doc.text("Legend:", leftMarginSummary, yPositionSummary + 20);
  const sortedTemplateSummary = [...data[0].template].sort((a, b) => b.score - a.score);
  sortedTemplateSummary.forEach((template, i) => {
    const capitalizedTitle = template.title
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    doc.text(`${template.score} – ${capitalizedTitle}`, leftMarginSummary + 20, yPositionSummary + 35 + (i * 15));
  });

  // Recommended Areas
  doc.setFont("Helvetica", "normal");
  doc.text("Recommended Areas for Improvement:", leftMarginSummary, yPositionSummary + 120);
  if (data[0].comment) {
    const cleanComment = data[0].comment.replace(/<[^>]*>/g, '').trim();
    const lines = doc.splitTextToSize(cleanComment, contentWidth - 20);
    doc.text(lines, leftMarginSummary + 10, yPositionSummary + 140);

    const linesStartY = yPositionSummary + 140 + (lines.length * 7);
    const linesCount = Math.max(0, 4 - lines.length);
    for (let i = 0; i < linesCount; i++) {
      doc.line(leftMarginSummary, linesStartY + (i * 20), rightMarginSummary, linesStartY + (i * 20));
    }
  } else {
    for (let i = 0; i < 4; i++) {
      doc.line(leftMarginSummary, yPositionSummary + 140 + (i * 20), rightMarginSummary, yPositionSummary + 140 + (i * 20));
    }
  }

  // Signature Section
  doc.line(leftMarginSummary, signatureYStart, leftMarginSummary + signatureWidth, signatureYStart);
  doc.text("Ratees' Signature", leftMarginSummary, signatureYStart + 10);

  doc.line(leftMarginSummary, signatureYStart + 30, leftMarginSummary + signatureWidth, signatureYStart + 30);
  doc.text("Signature over Printed Name", leftMarginSummary, signatureYStart + 40);

  doc.line(centerX - 115, signatureYStart + 70, leftMarginSummary + signatureWidth + 100, signatureYStart + 70);
  doc.text(formattedDate, centerX - 35, signatureYStart + 67);
  doc.text("Date", centerX - 20, signatureYStart + 80);

  // Rater's Signature
  doc.line(leftMarginSummary + signatureWidth + 20, signatureYStart, rightMarginSummary, signatureYStart);
  doc.text("Raters' Signature", leftMarginSummary + signatureWidth + 20, signatureYStart + 10);

  doc.setFont("Helvetica").setFontSize(10);
  doc.text(data[0].evaluatedBy, leftMarginSummary + signatureWidth + 80, signatureYStart + 25);
  doc.line(leftMarginSummary + signatureWidth + 20, signatureYStart + 30, rightMarginSummary, signatureYStart + 30);
  doc.text("Signature over Printed Name of Dept. Head",
    leftMarginSummary + signatureWidth + 20, signatureYStart + 40, { maxWidth: signatureWidth });

  // Noted By Section
  const notedByYStart = signatureYStart + 180;
  const notedByWidth = 250;

  doc.text("Noted by:", centerX, notedByYStart - 30, { align: "center" });

  doc.setFont("Helvetica", "bold");
  doc.text("ENGR. MILAGROS S. TAMAYO, MIM", centerX, notedByYStart + 20, { align: "center" });

  doc.setFont("Helvetica", "normal");
  doc.text("Vice President for Admin and Finance", centerX, notedByYStart + 40, { align: "center" });
  doc.text("Human Resource Development Officer", centerX, notedByYStart + 50, { align: "center" });

  // Date
  doc.line(centerX - (notedByWidth / 2), notedByYStart + 90, centerX + (notedByWidth / 2), notedByYStart + 90);
  doc.text(formattedDate, centerX, notedByYStart + 87, { align: "center" });
  doc.text("Date", centerX, notedByYStart + 100, { align: "center" });

  // Final Output
  window.open(doc.output("bloburl"));
};