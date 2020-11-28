# Plotly_Challenge

Belly Button Bio-Diversity Dashboard: 

1.)  The first step I took in building out this webpage was to create the "init" function that was to run whenever the page was loaded.  With this function I used
d3 to select the correct dropdown bar on the index.html and I used the data to read in the different "options" that would be available in the dropdown.  I used the 
different "names" from the data as the different choices since I knew I was going to be filtering all of the other functions on that value.

2.)  The second function I built was the one that filled out the demographic table.  I used d3 again to grab the correct parts of the index.html, and then I filtered the data
so that it equaled the test subject that was selected in the dropdown.  I had to clear out the html in the table so that it wouldn't keep loading new subjects, and then
I used "Object.entries" in order to read in each "key, value" pair.  I appended the variable that I set using d3 and then I filled in the table with the metadata.

3.)  The third function I built was just the "optionChanged" function...I just had to make sure that it ran the necessary functions that I was building out.

4.)  Finally, I built out the "buildPlots" function that built the necessary graphs and charts that I needed to load.  I used d3 to only load the data in once, I set all of
the variables that I knew I was going to need, and then I created 3 different traces to build everything out.  Once I had the correct trace information and the correct layout,
I just connected it to the index.html buy running a new plot and using the correct "plotting" variables.  I used a more basic "gauge" chart that shows the wash frequency.

5.)  Lastly, I made a few minor tweaks to how the index.html looked.

Thank you for checking out my page!