import { FaEnvelope, FaPhone, FaIdBadge } from "react-icons/fa";

export default function ClientInfo({ client }) {
  if (!client) {
    return <p className="text-muted">No client information available</p>;
  }

  return (
    <ul className="client-info-list">
      <li className="client-info-item">
        <FaIdBadge className="client-info-item-icon" size={20} />
        <div>
          <div className="text-muted small">Name</div>
          <div className="fw-medium">{client.name}</div>
        </div>
      </li>
      <li className="client-info-item">
        <FaEnvelope className="client-info-item-icon" size={20} />
        <div>
          <div className="text-muted small">Email</div>
          <a href={`mailto:${client.email}`} className="fw-medium">
            {client.email}
          </a>
        </div>
      </li>
      <li className="client-info-item">
        <FaPhone className="client-info-item-icon" size={20} />
        <div>
          <div className="text-muted small">Phone</div>
          <a href={`tel:${client.phone}`} className="fw-medium">
            {client.phone}
          </a>
        </div>
      </li>
    </ul>
  );
}
