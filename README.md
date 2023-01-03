# TDT 4310 - Intelligent Text Analytics and Language Understanding - Spring 2023

##  `Welcome 👋`
This is a space for the labs of TDT4310, including the tasks and supplementary material.

Note that the first lab will posted the first week of the course (**january 13**) alongside the regular lecture. The week after, **january 20 14:15**, the first lab session takes place in [**H3**](https://link.mazemap.com/xm0ZQ2gt), where you will be able to ask questions and get some assistance.

Main points:
1. Labs released every second Friday (see dates below)
2. You get an initial week to work with (and possibly finish) the lab
3. Lab session takes place. I will do my best to assist as many as I can. Note that this is an open session, where I encourage you to talk to your peers and discuss in groups.
4. Deadline is 1 week after the lab session.

For any other questions that may not be suitable for the lab sessions, contact us through the emails provided on blackboard.

## `Curriculum 📚`
This year, the course curriculum is mostly based around the brand new book by *Ekaterina Kochmar* -- Getting Started with Natural Language Processing. For purchasing instructions (+ discount), visit the course page on Blackboard.

<div style="text-align:center">
    <img src="assets/kochmar.png" width=200>
</div>

Moreover, we'll make use of the NLTK library. As usual, more information can be found on blackboard. The official site for NLTK is [here](https://www.nltk.org/book).

## `Labs 📝`
Labs will be found in this main directory as markdown files (e.g. [LAB_1.md](LAB_1.md)).

Here's a brief overview of the labs:

| Lab | Published | Deadline | Topic | Smart keyboard features | Libraries | Chapters |
| - | - | - | - | - | - | - |
| 1 | Jan. 13 | Jan. 27 | Basic text processing, introduction to word vectors and language modeling | Next-word prediction | NLTK | 2, 3 |
| 2 | Jan. 27 | Feb. 10 | Part-of-speech tagging, stemming/lemmatization, TF-IDF | Utilize part-of-speech for predictions | NLTK | 4, 5, 6 |
| 3 | Feb. 10 | Feb. 24 | Wordnet and SentiWordNet, dependency parsing, POS chunking | Sentiment-based and multi-word predictions | spaCy, Scikit-learn | 7, 8 |
| 4 | Feb. 24 | Mar. 10 | Unsupervised topic modeling and named entities | Topic-aware predictions | Scikit-learn, Gensim | 9, 10 |

From this point on, the focus will be shifted towards your projects. This will involve machine learning and deep learning techniques, building upon the tasks you've completed in the labs.

The level of difficulty will increase over time, as can be seen from the topics. Some of you will definitely feel the need to get more applications of modern state-of-the-art approaches, but note that you're free to explore anything in the project later in the course!

## `The main theme: building a smart keyboard 💻`
Throughout the labs, alongside a few questions and simple tasks, you will be implementing a **smart keyboard**, mostly from scratch. I have prepared a full-stack application, where your task is to build a system that suggests the next word(s). The frontend application is built using [**React**](https://reactjs.org/) and is accessible directly through [npm](https://www.npmjs.com) or through the supplied (precompiled) Electron application. The former will give you more flexibility when running the systems locally.

**The backend, which you will be working with**, is built using [**Flask**](https://palletsprojects.com/p/flask/). This course assumes fairly good knowledge of programming in general, and you are expected to be able to debug potential issues with the system yourself. I will, of course, do my best to aid you in this process. A screenshot of the application is shown below.

<div style="text-align:center">
    <img src="assets/electronapp.png" width=400>
    <p><i>Electron app</i></p>
</div>

The frontend application (running on your PC) is also set up to be exposed on your local network, allowing access from any other device connected to it. Below is an example with it accessed from a phone:

<div style="text-align:center">
    <img src="assets/lab_phone.png" width=400>
    <p><i>Phone accessing the frontend on a local network</i></p>
</div>

## `Grading 👨‍🏫`
The labs are not graded, but pass/fail. You need to pass all labs to be eligible for the exam. The criteria will be explained further below.

## `Questions and help 🙋‍♂️`
Try to keep questions regarding labs to the lab session. We will also allow for questions on Blackboard. Try to explore the Q&A resources we've published from earlier years first [here](https://github.com/tollefj/TDT4310-spring-2023).

Some info on the libraries used:
- NLTK has an extensive collection of both explanations and sample usages:
    - https://www.nltk.org/api/nltk.html and https://www.nltk.org/howto.html
- Spacy: https://spacy.io/api
- Scikit-learn: https://scikit-learn.org/stable/modules/classes.html
- Gensim: https://radimrehurek.com/gensim/apiref.html
