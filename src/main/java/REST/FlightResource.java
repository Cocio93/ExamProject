/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package REST;

import Facades.RESTFacade;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import java.text.ParseException;
import java.util.Map;
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
        JsonArray searchResponse = facade.getFromFlights(from, date, tickets);
        String json = sortJson(searchResponse);
        System.out.println(json);
        return json;
    }

    @Path("{from}/{to}/{date}/{tickets}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getFromToFlights(@PathParam("from") String from, @PathParam("to") String to, @PathParam("date") String date, @PathParam("tickets") int tickets) {
        JsonArray searchResponse = facade.getFromToFlights(from, to, date, tickets);
        String json = sortJson(searchResponse);
        System.out.println(json);
        return json;
    }

    @Path("flex/{from}/{startDate}/{endDate}/{tickets}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getFromFlightsFlex(@PathParam("from") String from, @PathParam("startDate") String startDate, @PathParam("endDate") String endDate, @PathParam("tickets") int tickets) throws ParseException {
        JsonArray searchResponse = facade.getFromFlightsFlex(from, startDate, endDate, tickets);
        String json = sortJson(searchResponse);
        System.out.println(json);
        return json;
    }

    @Path("flex/{from}/{to}/{startDate}/{endDate}/{tickets}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getFromToFlightsFlex(@PathParam("from") String from, @PathParam("to") String to, @PathParam("startDate") String startDate, @PathParam("endDate") String endDate, @PathParam("tickets") int tickets) throws ParseException {
        JsonArray searchResponse = facade.getFromToFlightsFlex(from, to, startDate, endDate, tickets);
        String json = sortJson(searchResponse);
        System.out.println(json);
        return json;
    }

    private String sortJson(JsonArray array) {
        Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'").setPrettyPrinting().create();
        JsonArray result = new JsonArray();
        for (JsonElement obj : array) {
            JsonObject jsonObj = obj.getAsJsonObject();
            String airline = jsonObj.get("airline").getAsString();
            JsonArray flights = jsonObj.getAsJsonArray("flights");
            for (JsonElement flight : flights) {
                
                JsonObject flightObj = flight.getAsJsonObject();
                flightObj.addProperty("airline", airline);
                flightObj.addProperty("baseUrl", jsonObj.get("baseUrl").getAsString());
                result.add(flightObj);
            }

        }
        String json = gson.toJson(result);
        return json;
    }
}
