/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Facades;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

/**
 *
 * @author John
 */
public class RESTFacade {

    DateFormat sdfISO = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

    public RESTFacade() {

    }

    private final String[] baseUrls = {"http://localhost:8084/RESTAirline/api/flights/"};

    public String getFromFlights(String from, String date, int tickets) {
        String endUrl = from + "/" + date + "/" + tickets;
        return getDataFromUrl(endUrl);
    }

    public String getFromFlightsFlex(String from, String fromDate, String toDate, int tickets) throws ParseException {
        LocalDate start = isoToLocalDate(fromDate);
        LocalDate end = isoToLocalDate(toDate);
        String json = "";

        for (LocalDate date = start; date.isBefore(end); date = date.plusDays(1)) {
            String isoDate = localDateToIso(date);
            String endUrl = from + "/" + isoDate + "/" + tickets;
            json += getDataFromUrl(endUrl);
        }
        return json;
    }

    public String getFromToFlights(String from, String to, String date, int tickets) {
        String endUrl = from + "/" + to + "/" + date + "/" + tickets;
        return getDataFromUrl(endUrl);
    }

    private String getDataFromUrl(String endUrl) {
        String json = "";
        for (String baseUrl : baseUrls) {
            try {
                URL url = new URL(baseUrl + endUrl);
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("GET");
                conn.setRequestProperty("Accept", "application/json");

                if (conn.getResponseCode() == 200) {
                    BufferedReader br = new BufferedReader(new InputStreamReader(
                            (conn.getInputStream())));
                    String output;
                    while ((output = br.readLine()) != null) {
                        json += output + "\n";
                    }
                    
                } else {
                    json = "Failed : HTTP error code : "
                            + conn.getResponseCode();
                }
                conn.disconnect();

            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return json;
    }

    private LocalDate isoToLocalDate(String date) throws ParseException {

        Date regDate = sdfISO.parse(date);
        LocalDate localDate = regDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        return localDate;
    }

    private String localDateToIso(LocalDate date) {
        Date tempDate = java.sql.Date.valueOf(date);
        String isoDate = sdfISO.format(tempDate);
        return isoDate;
    }
}
