/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package REST;

import Facades.RESTFacade;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.ParseException;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;

/**
 * REST Web Service
 *
 * @author John
 */
@Path("flights")
public class FlightResource {

    public FlightResource() {

    }

    private String[] baseUrls = {"http://airline-plaul.rhcloud.com/api/flightinfo/"};
    private RESTFacade facade = new RESTFacade();

    @Path("{from}/{date}/{tickets}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getFromFlights(@PathParam("from") String from, @PathParam("date") String date, @PathParam("tickets") int tickets) {
        return facade.getFromFlights(from, date, tickets);
    }

    @Path("{from}/{to}/{date}/{tickets}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getFromToFlights(@PathParam("from") String from, @PathParam("to") String to, @PathParam("date") String date, @PathParam("tickets") int tickets) {
        return facade.getFromToFlights(from, to, date, tickets);
    }
    
    @Path("flex/{from}/{startDate}/{endDate}/{tickets}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getFromFlightsFlex(@PathParam("from") String from, @PathParam("startDate") String startDate, @PathParam("endDate") String endDate, @PathParam("tickets") int tickets) throws ParseException {
        return facade.getFromFlightsFlex(from, startDate, endDate, tickets);
    }
}
