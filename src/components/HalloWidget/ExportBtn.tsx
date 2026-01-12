"use client"


export const ExportBtn = () => {
    const handleExport =()=>{
        alert('Data Exported!')
    }
  return (
    <button
    type="button"
    onClick={handleExport}>Export data</button>
  )
}
