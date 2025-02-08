import React from "react";
import { ToastContainer, toast } from "react-toastify";

const Contact = () => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "c60c6b99-6c2c-4421-9843-f997c174f48b");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("");
      // alert("Form Submitted Successfully");
      toast.success("Message Sent Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      // alert(data.message);
      toast.error(data.message);
      setResult("");
    }
  };
  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">
        Contact <span className="text-gray-600 underline">With Us</span>
      </h2>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block mb-2 text-sm text-left font-medium text-gray-600">
              Your Name
            </label>
            <input
              type="text"
              placeholder="Your Name"
              name="Name"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-2 text-sm text-left font-medium text-gray-600">
              Your Email
            </label>
            <input
              type="email"
              placeholder="Your Email"
              name="Email"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div>
          <label className="block mb-3 text-sm text-left font-medium text-gray-600">
            Message
          </label>
          <textarea
            rows="4"
            placeholder="Message"
            name="Message"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          {result ? result : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default Contact;
