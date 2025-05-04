
// ---------- components/ExamRegSummaryHelper/downloadCSV.js ----------

export default function downloadCSV(filename, rows) {
    const header = "\uFEFF";
    const csvString = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([header + csvString], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
  