import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DetailsPage = () => {
  const [form, setForm] = useState({
    dob: "",
    gender: "",
    parentName: "",
    pan: "",
    aadhaar: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
    bankAccount: "",
    ifsc: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // 🖼️ Image validation (15–100 KB)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const sizeKB = file.size / 1024;

    if (sizeKB < 15) {
      alert("Image is too small. Minimum size is 15 KB.");
      return;
    }

    if (sizeKB > 100) {
      alert("Image is too large. Maximum size is 100 KB.");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // 🔴 Validation
  const validateForm = () => {
    const newErrors = {};

    if (!form.dob) newErrors.dob = "Date of birth is required";
    if (!form.gender) newErrors.gender = "Gender is required";
    if (!form.parentName) newErrors.parentName = "Parent name is required";

    if (!form.pan) newErrors.pan = "PAN is required";
    if (!form.aadhaar) newErrors.aadhaar = "Aadhaar is required";

    if (!form.addressLine) newErrors.addressLine = "Address is required";
    if (!form.city) newErrors.city = "City is required";
    if (!form.state) newErrors.state = "State is required";
    if (!form.pincode) newErrors.pincode = "Pincode is required";

    if (!form.bankAccount) newErrors.bankAccount = "Bank account is required";
    if (!form.ifsc) newErrors.ifsc = "IFSC code is required";

    if (!image) newErrors.profileImage = "Profile photo is required";

    return newErrors;
  };

  const handleSubmit = async () => {
    setTouched(true);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const mobile = localStorage.getItem("signup_mobile");
    if (!mobile) {
      alert("Session expired. Please signup again.");
      navigate("/signup");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      formData.append("mobile", mobile);
      formData.append("profileImage", image);

      const res = await axios.post(
        "/user/details",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data.success) {
        navigate("/signup/credentials");
      } else {
        alert("Failed to save details");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to save details");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) => (touched && errors[field] ? "error-input" : "");

  return (
    <div className="details-wrapper">
      <div className="details-card">
        <div className="stepper">
          <div className="step completed">
            <div className="circle">1</div>
            <span>Mobile</span>
          </div>

          <div className="line completed"></div>

          <div className="step completed">
            <div className="circle">2</div>
            <span>Email</span>
          </div>

          <div className="line active"></div>

          <div className="step active">
            <div className="circle">3</div>
            <span>Details</span>
          </div>
        </div>

        <h1>Personal details</h1>
        <p className="subtitle">
          Please make sure the details match your official documents.
        </p>

        {/* Personal */}
        <section>
          <h3>Personal</h3>
          <div className="grid">
            <div>
              <input
                type="date"
                name="dob"
                onChange={handleChange}
                className={inputClass("dob")}
              />
              {touched && errors.dob && (
                <p className="error-text">{errors.dob}</p>
              )}
            </div>

            <div>
              <input
                name="gender"
                placeholder="Gender"
                onChange={handleChange}
                className={inputClass("gender")}
              />
              {touched && errors.gender && (
                <p className="error-text">{errors.gender}</p>
              )}
            </div>

            <div>
              <input
                name="parentName"
                placeholder="Parent / Guardian name"
                onChange={handleChange}
                className={inputClass("parentName")}
              />
              {touched && errors.parentName && (
                <p className="error-text">{errors.parentName}</p>
              )}
            </div>
          </div>
        </section>

        {/* Identity */}
        <section>
          <h3>Identity</h3>
          <div className="grid">
            <div>
              <input
                name="pan"
                placeholder="PAN (ABCDE1234F)"
                onChange={handleChange}
                className={inputClass("pan")}
              />
              {touched && errors.pan && (
                <p className="error-text">{errors.pan}</p>
              )}
            </div>

            <div>
              <input
                name="aadhaar"
                placeholder="Aadhaar (12 digits)"
                onChange={handleChange}
                className={inputClass("aadhaar")}
              />
              {touched && errors.aadhaar && (
                <p className="error-text">{errors.aadhaar}</p>
              )}
            </div>
          </div>
        </section>

        {/* Address */}
        <section>
          <h3>Address</h3>
          <div className="grid">
            {["addressLine", "city", "state", "pincode"].map((field) => (
              <div key={field}>
                <input
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  onChange={handleChange}
                  className={inputClass(field)}
                />
                {touched && errors[field] && (
                  <p className="error-text">{errors[field]}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Bank */}
        <section>
          <h3>Bank</h3>
          <div className="grid">
            <div>
              <input
                name="bankAccount"
                placeholder="Bank account number"
                onChange={handleChange}
                className={inputClass("bankAccount")}
              />
              {touched && errors.bankAccount && (
                <p className="error-text">{errors.bankAccount}</p>
              )}
            </div>

            <div>
              <input
                name="ifsc"
                placeholder="IFSC code"
                onChange={handleChange}
                className={inputClass("ifsc")}
              />
              {touched && errors.ifsc && (
                <p className="error-text">{errors.ifsc}</p>
              )}
            </div>
          </div>
        </section>

        {/* Photo */}
        <section>
          <h3>Profile photo</h3>
          <div className="photo-upload">
            {preview ? (
              <img src={preview} alt="preview" />
            ) : (
              <div className="photo-placeholder">Photo</div>
            )}
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          {touched && errors.profileImage && (
            <p className="error-text">{errors.profileImage}</p>
          )}
        </section>

        <button
          className="primary-btn"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? "Saving..." : "Save & Continue"}
        </button>
      </div>
    </div>
  );
};

export default DetailsPage;
