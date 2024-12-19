import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logouw from './logos/logouw.png';
import './logoUW.css';
import './statusColors.css';
import MapComponent from './mapComponent';

const FlightListPage = ({ flights, getStatusColor, onAddClick, onEditFlight, onDeleteFlight }) => {
    const navigate = useNavigate();
    const [lastOrigin, setLastOrigin] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());
    const [hoveredRow, setHoveredRow] = useState(null);
  
    useEffect(() => {
      if (flights.length > 0) {
        const lastFlight = flights[flights.length - 1];
        setLastOrigin(lastFlight.origin);
      }
  
      const timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
  
      return () => clearInterval(timer);
    }, [flights]);
  
    const formattedTime = currentTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const handleEdit = (flight) => {
        navigate(`/edit/${flight.id}`);
    };

    const handleDelete = (flightId) => {
        if (window.confirm('Are you sure you want to delete this flight?')) {
            onDeleteFlight(flightId);
        }
    };
  
    return (
        <div className="container py-4">
            <div className="row gx-4">
                <div className="col-lg-8 col-12 mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1 className="h2 text-white">Flights</h1>
                        <div className="d-flex align-items-center">
                            <Button 
                                variant="primary" 
                                onClick={onAddClick}
                                className="me-3"
                            >
                                Add New Flight
                            </Button>
                            <span className="text-white d-none d-lg-block">{formattedTime}</span>
                        </div>
                    </div>
  
                    <div className="table-responsive">
                        <table className="table table-striped table-dark">
                            <thead>
                                <tr>
                                    <th>CIA</th>
                                    <th>Flight</th>
                                    <th>Origin</th>
                                    <th>Destination</th>
                                    <th>Status</th>
                                    <th>Time</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {flights.map((flight) => (
                                    <tr 
                                        key={flight.id}
                                        onMouseEnter={() => setHoveredRow(flight.id)}
                                        onMouseLeave={() => setHoveredRow(null)}
                                        className="position-relative"
                                    >
                                        <td>
                                            <img
                                                src={logouw}
                                                alt="Logouw"
                                                className="cia-logo img-fluid"
                                                style={{ maxWidth: '50px' }}
                                            />
                                        </td>
                                        <td>{flight.flightNumber}</td>
                                        <td>{flight.origin}</td>
                                        <td>{flight.destination}</td>
                                        <td>
                                            <span className={getStatusColor(flight.status)}>
                                                {flight.status}
                                            </span>
                                        </td>
                                        <td>{flight.time}</td>
                                        <td>
                                            {hoveredRow === flight.id && (
                                                <div className="d-flex gap-2">
                                                    <button 
                                                        className="btn btn-link p-0 text-primary"
                                                        onClick={() => handleEdit(flight)}
                                                        title="Edit flight"
                                                    >
                                                        <i className="bi bi-pencil-square"></i>
                                                    </button>
                                                    <button 
                                                        className="btn btn-link p-0 text-danger"
                                                        onClick={() => handleDelete(flight.id)}
                                                        title="Delete flight"
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div className="col-lg-4 col-12">
                    <div className="bg-dark p-3 rounded">
                        <MapComponent lastOrigin={lastOrigin} />
                    </div>
                </div>
            </div>
        </div>
    );
};
  
export default FlightListPage;