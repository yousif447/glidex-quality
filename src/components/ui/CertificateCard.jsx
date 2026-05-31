"use client";

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function CertificateCard({ data }) {
  if (data.type !== "published") {
    return (
      <div className="w-full flex flex-col items-center justify-center py-12 gap-4">
        <p className="text-lg font-semibold text-gray-700">
          {data.certifiable?.name}
        </p>
        <p
          className="text-[80px] font-extrabold text-gray-300 leading-none tracking-widest select-none"
          style={{ fontFamily: "impact, sans-serif" }}
        >
          DRAFT
        </p>
      </div>
    );
  }

  const rows = [
    ["Certificate type", "Published"],
    ["Company name", data.certifiable?.name],
    ["Address", data.certifiable?.address],
    [
      data.iso_item?.name === "UL 2900-2-3:2023" ? "Product" : "Scope",
      data.scope ?? data.certifiable?.scope,
    ],
    ["Standard", data.iso_item?.name],
    ["Category", data.iso_item?.certificate_category],
    ["Issue date", formatDate(data.issue_date)],
    ["Valid until", formatDate(data.valid_until)],
    ["Initial issue date", formatDate(data.initial_issue_date)],
    ["Expiry date", formatDate(data.expiry_date)],
    ["Registration no.", data.registration_number],
    ["IAF code", data.iaf_code],
  ];

  const filteredRows = rows.filter(([label, value]) => {
    if (label === "IAF code") {
      return (
        value !== null && value !== undefined && String(value).trim() !== ""
      );
    }
    return true;
  });

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <tbody>
          {filteredRows.map(([label, value], i) => (
            <tr key={label} className={i % 2 === 0 ? "bg-gray-50" : ""}>
              <td className="py-2.5 px-4 font-medium text-gray-500 w-2/5 align-top">
                {label}
              </td>
              <td className="py-2.5 px-4 text-gray-900 align-top break-words">
                {value || "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
