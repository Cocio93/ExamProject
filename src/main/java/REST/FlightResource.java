/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package REST;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
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
    
    @Path("{from}/{date}/{tickets}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getJson(@PathParam("from") String from, @PathParam("date") String date, @PathParam("tickets") int tickets) {
        String json = "";
        for (String baseUrl : baseUrls) {
            try {

                URL url = new URL(baseUrl + from + "/" + date + "/" + tickets);
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("GET");
                conn.setRequestProperty("Accept", "application/json");

                if (conn.getResponseCode() != 200) {
                    throw new RuntimeException("Failed : HTTP error code : "
                            + conn.getResponseCode());
                }


                BufferedReader br = new BufferedReader(new InputStreamReader(
                        (conn.getInputStream())));
                
                String output;
                while ((output = br.readLine()) != null) {
                    json += output + "\n";
                }
               
                conn.disconnect();

            } catch (IOException e) {

                e.printStackTrace();

            }
        }
        return json;
    }
}
