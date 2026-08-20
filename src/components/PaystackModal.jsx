import { useState } from 'react';
import { X, CreditCard, Landmark, Smartphone, QrCode, CheckCircle2, ShieldCheck, Copy, Check } from 'lucide-react';
import './PaystackModal.css';

export default function PaystackModal({ isOpen, onClose, formData }) {
  const [activeTab, setActiveTab] = useState('card');
  const [copied, setCopied] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('pending'); // 'pending' | 'processing' | 'success'
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [amount, setAmount] = useState(formData?.amount || 50000);

  if (!isOpen) return null;

  const transactionRef = `BOEA-PAYSTACK-${Math.floor(100000000 + Math.random() * 900000000)}`;

  const handleCopyAccount = () => {
    navigator.clipboard.writeText('0123456789');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleProcessPayment = (e) => {
    e.preventDefault();
    setPaymentStatus('processing');
    setTimeout(() => {
      setPaymentStatus('success');
    }, 2000);
  };

  return (
    <div className="paystack-overlay" onClick={onClose}>
      <div className="paystack-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Paystack Header */}
        <div className="paystack-header">
          <div className="paystack-merchant-info">
            <img src="/logo.png" alt="Walkfront Africa" className="paystack-merchant-logo" />
            <div>
              <h4 className="paystack-merchant-name">Walkfront African Network Ltd</h4>
              <p className="paystack-merchant-desc">
                {formData?.interestType || 'Humanitarian & Sponsorship Support'}
              </p>
            </div>
          </div>
          <div className="paystack-amount-badge">
            <span className="paystack-currency">NGN</span>
            <span className="paystack-amount">₦{Number(amount).toLocaleString()}</span>
          </div>
          <button type="button" className="paystack-close-btn" onClick={onClose} aria-label="Cancel Payment">
            <X size={18} />
          </button>
        </div>

        {paymentStatus === 'success' ? (
          /* Payment Success Confirmation View */
          <div className="paystack-success-view">
            <CheckCircle2 size={56} className="paystack-success-icon" />
            <h3 className="paystack-success-title">Payment Successful!</h3>
            <p className="paystack-success-text">
              Thank you, <strong>{formData?.fullName || 'Valued Supporter'}</strong>. Your payment of{' '}
              <strong>₦{Number(amount).toLocaleString()}</strong> has been processed via Paystack.
            </p>
            <div className="paystack-receipt-box">
              <div className="paystack-receipt-row">
                <span>Transaction Ref:</span>
                <code>{transactionRef}</code>
              </div>
              <div className="paystack-receipt-row">
                <span>Payer Email:</span>
                <span>{formData?.email || 'supporter@boea.org'}</span>
              </div>
              <div className="paystack-receipt-row">
                <span>Payment Channel:</span>
                <span className="text-uppercase">{activeTab}</span>
              </div>
            </div>
            <button type="button" className="btn btn-gold paystack-done-btn" onClick={onClose}>
              Done & Close
            </button>
          </div>
        ) : (
          /* Payment Processing / Channels View */
          <div className="paystack-body">
            {/* Payment Channel Tabs */}
            <div className="paystack-tabs-sidebar">
              <button
                type="button"
                className={`paystack-tab-btn ${activeTab === 'card' ? 'active' : ''}`}
                onClick={() => setActiveTab('card')}
              >
                <CreditCard size={16} /> Pay with Card
              </button>
              <button
                type="button"
                className={`paystack-tab-btn ${activeTab === 'transfer' ? 'active' : ''}`}
                onClick={() => setActiveTab('transfer')}
              >
                <Landmark size={16} /> Bank Transfer
              </button>
              <button
                type="button"
                className={`paystack-tab-btn ${activeTab === 'ussd' ? 'active' : ''}`}
                onClick={() => setActiveTab('ussd')}
              >
                <Smartphone size={16} /> USSD / Bank
              </button>
              <button
                type="button"
                className={`paystack-tab-btn ${activeTab === 'qr' ? 'active' : ''}`}
                onClick={() => setActiveTab('qr')}
              >
                <QrCode size={16} /> Scan QR Code
              </button>
            </div>

            {/* Payment Channel Content View */}
            <div className="paystack-content-panel">
              {paymentStatus === 'processing' ? (
                <div className="paystack-loading-view">
                  <div className="paystack-spinner" />
                  <p className="paystack-loading-text">Communicating with Paystack Gateway...</p>
                  <span className="caption text-muted">Please do not refresh or close this window</span>
                </div>
              ) : (
                <>
                  {activeTab === 'card' && (
                    <form onSubmit={handleProcessPayment} className="paystack-form">
                      <div className="paystack-field">
                        <label className="paystack-label">CARD NUMBER</label>
                        <input
                          type="text"
                          className="paystack-input"
                          placeholder="0000 0000 0000 0000"
                          maxLength={19}
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          required
                        />
                      </div>
                      <div className="paystack-row">
                        <div className="paystack-field">
                          <label className="paystack-label">CARD EXPIRY</label>
                          <input
                            type="text"
                            className="paystack-input"
                            placeholder="MM / YY"
                            maxLength={5}
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            required
                          />
                        </div>
                        <div className="paystack-field">
                          <label className="paystack-label">CVV</label>
                          <input
                            type="password"
                            className="paystack-input"
                            placeholder="123"
                            maxLength={4}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="paystack-field">
                        <label className="paystack-label">CONTRIBUTION AMOUNT (NGN)</label>
                        <input
                          type="number"
                          className="paystack-input"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          min={1000}
                          required
                        />
                      </div>

                      <button type="submit" className="paystack-submit-btn">
                        Pay ₦{Number(amount).toLocaleString()}
                      </button>
                    </form>
                  )}

                  {activeTab === 'transfer' && (
                    <div className="paystack-transfer-view">
                      <p className="paystack-info-text">
                        Transfer <strong>₦{Number(amount).toLocaleString()}</strong> to the designated Paystack Virtual Account below:
                      </p>

                      <div className="paystack-account-card">
                        <span className="paystack-bank-tag">Wema Bank / Paystack</span>
                        <div className="paystack-account-row">
                          <span className="paystack-acc-number">9934 812 045</span>
                          <button type="button" className="paystack-copy-btn" onClick={handleCopyAccount}>
                            {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                            {copied ? 'Copied' : 'Copy'}
                          </button>
                        </div>
                        <span className="paystack-acc-name">Walkfront BOEA Humanitarian Scheme</span>
                      </div>

                      <p className="paystack-timer-text">
                        Account expires in <code>29:59</code> minutes
                      </p>

                      <button
                        type="button"
                        className="paystack-submit-btn"
                        onClick={handleProcessPayment}
                      >
                        I Have Completed This Bank Transfer
                      </button>
                    </div>
                  )}

                  {activeTab === 'ussd' && (
                    <div className="paystack-ussd-view">
                      <label className="paystack-label">SELECT YOUR BANK</label>
                      <select className="paystack-input">
                        <option>Guaranty Trust Bank (*737*)</option>
                        <option>Access Bank (*901*)</option>
                        <option>Zenith Bank (*966*)</option>
                        <option>First Bank (*894*)</option>
                        <option>United Bank for Africa (*919*)</option>
                      </select>

                      <div className="paystack-ussd-box">
                        <span className="caption">Dial this string on your registered mobile number:</span>
                        <code className="paystack-ussd-code">*737*33*50000*0012#</code>
                      </div>

                      <button
                        type="button"
                        className="paystack-submit-btn"
                        onClick={handleProcessPayment}
                      >
                        I Have Dialled USSD Code
                      </button>
                    </div>
                  )}

                  {activeTab === 'qr' && (
                    <div className="paystack-qr-view">
                      <p className="paystack-info-text">
                        Scan with your Mobile Banking App or camera to pay <strong>₦{Number(amount).toLocaleString()}</strong>
                      </p>

                      <div className="paystack-qr-box">
                        <div className="paystack-qr-placeholder">
                          <QrCode size={120} className="gold-text" />
                          <span className="caption">Paystack Encrypted QR</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="paystack-submit-btn"
                        onClick={handleProcessPayment}
                      >
                        Simulate QR Payment Completion
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* Footer Secured Badge */}
        <div className="paystack-footer">
          <ShieldCheck size={14} className="paystack-shield" />
          <span>Secured by <strong>Paystack Payment Gateway</strong> (256-bit SSL)</span>
        </div>
      </div>
    </div>
  );
}
