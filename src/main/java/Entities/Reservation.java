/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Entities;

/**
 *
 * @author John
 */
public class Reservation {

    String flightID;
    int numberOfSeats;
    String reserveeName;
    String reservePhone;
    String reserveeEmail;
    Passenger[] passengers;

//    public Reservation(String flightID, int numberOfseats, String reserveeName, String reservePhone, String reserveeEmail, Passenger[] passengers) {
//        this.flightID = flightID;
//        this.numberOfSeats = numberOfseats;
//        this.reserveeName = reserveeName;
//        this.reservePhone = reservePhone;
//        this.reserveeEmail = reserveeEmail;
//        this.passengers = passengers;
//    }

    public String getFlightID() {
        return flightID;
    }

    public void setFlightID(String flightID) {
        this.flightID = flightID;
    }

    public int getNumberOfSeats() {
        return numberOfSeats;
    }

    public void setNumberOfSeats(int numberOfseats) {
        this.numberOfSeats = numberOfseats;
    }

    public String getReserveeName() {
        return reserveeName;
    }

    public void setReserveeName(String reserveeName) {
        this.reserveeName = reserveeName;
    }

    public String getReservePhone() {
        return reservePhone;
    }

    public void setReservePhone(String reservePhone) {
        this.reservePhone = reservePhone;
    }

    public String getReserveeEmail() {
        return reserveeEmail;
    }

    public void setReserveeEmail(String reserveeEmail) {
        this.reserveeEmail = reserveeEmail;
    }

    public Passenger[] getPassengers() {
        return passengers;
    }

    public void setPassengers(Passenger[] passengers) {
        this.passengers = passengers;
    }

}
