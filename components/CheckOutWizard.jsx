import React from 'react';

const CheckOutWizard = ({ activeStep = 0 }) => {
  return (
    <ul className="mb-2 w-full steps">
      {['User Login', 'Shipping Address', 'Payment Method', 'Place Order'].map(
        (step, index) => (
          <div
            key={step}
            className={`flex-1  text-center ${
              index <= activeStep ? 'step step-primary' : 'step'
            }`}
          >
            {step}
          </div>
        )
      )}
    </ul>
  );
};

export default CheckOutWizard;
