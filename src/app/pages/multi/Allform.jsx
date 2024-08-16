'use client'
import React, { useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import PropertyDetailsForm from './PropertyDetailsForm';
import AdditionalDetailsForm from './AdditionalDetailsForm';
import AgreementDetailsForm from './AgreementDetailsForm';
import RentDetailsForm from './RentDetailsForm';
import Owner from './Owner';

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
      const response = await fetch('/api/All_form', {
        method: 'POST',
        body: finalFormData // Send finalFormData as FormData object
      });
  
      if (!response.ok) {
        throw new Error('Error submitting form data');
      }
  
      const responseData = await response.json();
      console.log('Form data submitted successfully:', responseData);
      // Handle successful submission (e.g., display success message)
    } catch (error) {
      console.error('Error submitting form data:', error);
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
