'use client';
import React, { useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import PropertyDetailsForm from './PropertyDetailsForm';
import AdditionalDetailsForm from './AdditionalDetailsForm';
import AgreementDetailsForm from './AgreementDetailsForm';
import RentDetailsForm from './RentDetailsForm';
import Owner from './Owner';
import { toast } from 'react-toastify';

const Page = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({}); // State to store form data
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track form submission

  const nextStep = (data) => {
    setFormData({ ...formData, ...data }); // Update form data
    setStep(step + 1);
  };
  
  const prevStep = () => {
    setStep(step - 1);
  };

  const calculateProgress = () => {
    return (step / 6) * 100; // Progress out of 100%
  };

  const handleSubmit = async (finalFormData) => { // Accept finalFormData as argument
    console.log('Submitting form data:', finalFormData);
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/auth/All_form', {
        method: 'POST',
        body: finalFormData, // Send finalFormData as JSON string
      });
  
      if (!response.ok) {
        throw new Error('Error submitting form data');
      }
  
      const responseData = await response.json();
      toast.success('PG added successfully');
      // Clear form data upon successful submission
      setFormData({});
      setStep(1); // Reset to the first step
    } catch (error) {
      toast.error('Error submitting form data: ' + error.message);
      // Handle submission error (e.g., display error message)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <ProgressBar now={calculateProgress()} label={`Step ${step}`} variant='success' />
      {step === 1 && (
        <PropertyDetailsForm formData={formData} onNext={nextStep} />
      )}
      {step === 2 && (
        <AdditionalDetailsForm formData={formData} onNext={nextStep} onBack={prevStep} />
      )}
      {step === 3 && (
        <AgreementDetailsForm formData={formData} onNext={nextStep} onBack={prevStep} />
      )}
      {step === 4 && (
        <RentDetailsForm formData={formData} onNext={nextStep} onBack={prevStep} />
      )}
      {step === 5 && (
        <Owner formData={formData} setFormData={setFormData} onSubmit={handleSubmit} onBack={prevStep} />
      )}
    </div>
  );
};

export default Page;
