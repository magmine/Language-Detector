<center><h1>Language-Detector</h1></center>

## Overview:
Given a text input detect the main language / languages used on it

## Implementation details:

- A user writes a text in the text field and submit it as a post request
- The backend receives the post request
- The text is splitted into tokens using regex or nltk (natural language toolkit)

- For each language DAWG we check the number of tokens that are part of it.
    - I should have a class / function that gets word tokens as input and returns a sorted dictionary containing the language and the the number of occurances
    - API view shouldn't know about which Data structure I'm using DAWG or other.
- The DAWG having maximum occurances means that it's correspnding language is the predominant language

## Design constraints:
- I should be able to add support to a new language by adding just it's file path and the language name, nothing else

## Design choices:

- Data Structure:
To implement this system I choosed to work with a DAWG (Directed Acyclic Word Graph). This category are useful in applications with constant source text (language word list in our case)
with special emphasis on speed.
    - Complexity: Concider `n` as the number of words in a language word-list and `m` the length of a given word
        - Time complexity:
            - Creating a DAWG: `O(n * m)`
            - Adding a word to the DAWG: `O(m)`
            - Checking if a word is part of the DAWG: `O(m)`
        - Space complexity:
            - `O(n)`
- Parsing the text input:
At the moment I didn't find any tool that parses different languages perfectly to match the words in the words list. I tried both python regex utlity _re_ and _nltk_, _re_ provided the best results (not quantified at the moment).
In terms of performance It's a todo work.


### References:

- Paper on the DAWG data structure: http://www.kybernetika.cz/content/2002/1/105/paper.pdf
- Language word lists source: http://gwicks.net/justwords.html
