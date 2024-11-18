import React, { useState } from 'react'

export default function SetRefferal() {
  const [amount, setAmount] = useState("");
  const [fixedAmount, setFixedAmount] = useState(false);
  const [weeklyDebit, setWeeklyDebit] = useState(false);
  const [immediateDebit, setImmediateDebit] = useState(false);

  const handleSave = () => {
    // Handle save logic here
    console.log("Saved amount:", amount);
  };

  const handleSaveChanges = () => {
    // Handle save changes logic here
    console.log("Changes saved");
  };

  const handleDiscard = () => {
    // Handle discard logic here
    console.log("Changes discarded");
  };

  return (
    <div>
    <div className="flex flex-col items-center">
      <div className="w-full bg-white p-4 border rounded shadow-md ">
        <h2 className="text-xl font-bold mb-4">Cash Debit</h2>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={fixedAmount}
            onChange={() => setFixedAmount(!fixedAmount)}
            className="mr-2"
          />
          <label className="text-lg">Fixed Amount debit</label>
        </div>
        {fixedAmount && (
          <div className="flex items-center mb-4">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter Amount"
              className="mr-2 p-2 border rounded"
            />
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        )}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={weeklyDebit}
            onChange={() => setWeeklyDebit(!weeklyDebit)}
            className="mr-2"
          />
          <label className="text-lg">weekly Debit</label>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={immediateDebit}
            onChange={() => setImmediateDebit(!immediateDebit)}
            className="mr-2"
          />
          <label className="text-lg">Immediate Debit</label>
        </div>
      </div>
    </div>

    <div className="flex justify-end space-x-10 items-center py-3">
      <button onClick={handleDiscard} className="text-red-500">
        Discard
      </button>
      <button
        onClick={handleSaveChanges}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>
    </div>
  </div>
  )
}
