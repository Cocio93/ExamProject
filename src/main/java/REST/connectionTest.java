/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package REST;

/**
 *
 * @author John
 */
public class connectionTest {

    private static String[] baseUrls = {"http://airline-plaul.rhcloud.com/api/flightinfo/"};
    
    public static void main(String[] args) {
        FlightResource resource = new FlightResource();
        System.out.println(resource.getJson("STN", "2017-01-19T00:00:00.000Z", 3));
    }
}
