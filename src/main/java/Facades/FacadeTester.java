/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Facades;

import REST.FlightResource;
import java.text.ParseException;

/**
 *
 * @author John
 */
public class FacadeTester {

    private static String[] baseUrls = {"http://airline-plaul.rhcloud.com/api/flightinfo/"};
    
    public static void main(String[] args) throws ParseException {
        RESTFacade facade = new RESTFacade();
        System.out.println(facade.getFromFlights("CPH", "2017-01-01T00:00:00.000Z", 3));
    }
}
