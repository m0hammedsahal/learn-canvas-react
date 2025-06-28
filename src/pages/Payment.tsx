
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock, CheckCircle, ArrowLeft } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import Modal from '@/components/common/Modal';

const Payment: React.FC = () => {
  const { selectedCourse } = useApp();
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Format card number
    if (e.target.name === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
    }
    
    // Format expiry date
    if (e.target.name === 'expiryDate') {
      value = value.replace(/\D/g, '').replace(/(\d{2})(\d{2})/, '$1/$2');
    }

    setPaymentData({
      ...paymentData,
      [e.target.name]: value
    });
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
    }, 3000);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate('/dashboard');
  };

  if (!selectedCourse) {
    navigate('/courses');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      <div className="px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/courses')}
            className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            <span className="font-poppins">Back to Courses</span>
          </button>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Payment Form */}
            <Card className="animate-fade-in">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <CreditCard className="text-primary mr-3" size={28} />
                  <h2 className="text-2xl font-raleway font-bold text-text-primary">
                    Payment Details
                  </h2>
                </div>

                <form onSubmit={handlePayment} className="space-y-6">
                  <div>
                    <label className="block text-sm font-poppins font-medium text-text-primary mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      name="cardholderName"
                      value={paymentData.cardholderName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-poppins"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-poppins font-medium text-text-primary mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={paymentData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-poppins"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-poppins font-medium text-text-primary mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={paymentData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-poppins"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-poppins font-medium text-text-primary mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={paymentData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        maxLength={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-poppins"
                        required
                      />
                    </div>
                  </div>

                  <div className="bg-primary-50 p-4 rounded-lg flex items-center">
                    <Lock className="text-primary mr-3" size={20} />
                    <p className="text-sm text-text-secondary font-poppins">
                      Your payment information is secure and encrypted with 256-bit SSL technology.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    isLoading={isProcessing}
                  >
                    {isProcessing ? 'Processing Payment...' : `Pay ₹${selectedCourse.price.toLocaleString()}`}
                  </Button>
                </form>
              </div>
            </Card>

            {/* Order Summary */}
            <Card className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="p-8">
                <h3 className="text-2xl font-raleway font-bold text-text-primary mb-6">
                  Order Summary
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-raleway font-semibold text-text-primary">
                        {selectedCourse.name}
                      </h4>
                      <p className="text-text-secondary font-poppins text-sm">
                        {selectedCourse.description}
                      </p>
                    </div>
                    <span className="font-raleway font-bold text-text-primary">
                      ₹{selectedCourse.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="border-t pt-4">
                    <h5 className="font-raleway font-semibold text-text-primary mb-3">
                      What's Included:
                    </h5>
                    <ul className="space-y-2">
                      {selectedCourse.subjects.map((subject) => (
                        <li key={subject.id} className="flex items-center text-text-secondary">
                          <CheckCircle className="text-green-500 mr-2" size={16} />
                          <span className="font-poppins text-sm">
                            {subject.name} ({subject.chapters.length} chapters)
                          </span>
                        </li>
                      ))}
                      <li className="flex items-center text-text-secondary">
                        <CheckCircle className="text-green-500 mr-2" size={16} />
                        <span className="font-poppins text-sm">Lifetime Access</span>
                      </li>
                      <li className="flex items-center text-text-secondary">
                        <CheckCircle className="text-green-500 mr-2" size={16} />
                        <span className="font-poppins text-sm">Mobile & Desktop Access</span>
                      </li>
                    </ul>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-xl font-raleway font-bold text-text-primary">
                      <span>Total</span>
                      <span>₹{selectedCourse.price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Modal isOpen={showSuccess} onClose={handleSuccessClose} title="Payment Successful!">
        <div className="text-center py-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="text-green-500" size={40} />
          </div>
          <h3 className="text-2xl font-raleway font-bold text-text-primary mb-4">
            Welcome to {selectedCourse.name}!
          </h3>
          <p className="text-text-secondary font-poppins mb-8">
            Your payment has been processed successfully. You now have lifetime access to all course materials.
          </p>
          <Button onClick={handleSuccessClose} size="lg">
            Start Learning
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Payment;
