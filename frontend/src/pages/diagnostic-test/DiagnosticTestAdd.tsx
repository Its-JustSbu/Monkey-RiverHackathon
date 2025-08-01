import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../assets/globalVariables";
import alertToast from "../../components/alertToast";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface DiagnosticData {
  id: number;
  name: string;
  result: string;
  date: Date | null;
}

export default function DiagnosticTestAdd() {
  const navigate = useNavigate();
  const [diagnosticTest, setDiagnosticTest] = useState<DiagnosticData>({
    id: 0,
    name: "",
    result: "",
    date: null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDiagnosticTest({ ...diagnosticTest, [e.target.name]: e.target.value });
  };

  const handleCreateTest = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch(`${BACKEND_URL}/diagnostic/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ diagnosticTest }),
    });
    const data = await response.json();

    // if (response.ok) {
    //   alertToast({ message: "Successfully created diagnostic test" });
    // } else {
    //   alertToast({ message: "Error creating diagnostic test" });
    // }
  };
  return (
    <>
      <form onSubmit={handleCreateTest}>
        <div>
          <label>Diagnostic Test Name</label>
          <input
            type="text"
            required
            value={diagnosticTest.name}
            onChange={() => handleChange}
          />
        </div>
        <div>
          <label>Result</label>
          <input
            type="text"
            required
            value={diagnosticTest.result}
            onChange={() => handleChange}
          />
        </div>
        <div>
          <label>Date</label>
          {/* <DatePicker
            value={diagnosticTest.date}
          /> */}
        </div>

        <button type="submit">Create</button>
      </form>
    </>
  );
}
