#!/bin/sh
files="/home/amaghous/Programming/web/Language-Detector/data/*.txt"
for i in $files
do
  awk NF $i > $i.out 
  mv  $i.out $i
done
