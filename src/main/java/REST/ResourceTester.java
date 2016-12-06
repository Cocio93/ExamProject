/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package REST;

import java.text.ParseException;

/**
 *
 * @author John
 */
public class ResourceTester {

    public static void main(String[] args) throws ParseException {
        FlightResource resource = new FlightResource();
        String t = resource.getFromFlights("CPH", "2017-01-01T00:00:00.000Z", 3);
    }
}
