# [Fillwords](https://play.google.com/store/apps/details?id=com.fillwordsFree)

## Description

Fillwords - Learn Foreign Languages is a logical game created to help you learn foreign languages, improve your memory and concentration span!

In this version of a hungarian crossword puzzle your goal is to memorize words and their translations within a certain time limit and find them on the game field.

This game is an awesome way to improve and expand your vocabulary, it comes with dictionaries for many language pairs, such as:
- English - Russian
- Russian - English
- German - Italian
- English - Italian
- Italian - English
- English - Spanish
- Spanish - English

Each of them includes thousands of words, which, together with random generated fields grants nigh infinite replayability!

## Views

Main|Game|Statistics|Settings|
:---:|:---:|:---:|:---:|
![fillwordsMain.gif](https://s3.gifyu.com/images/fillwordsMain.gif) |  ![fillwordsGame.gif](https://s3.gifyu.com/images/fillwordsGame.gif) | [![fillwordsStatistics.gif](https://s3.gifyu.com/images/fillwordsStatistics.gif)](https://gifyu.com/image/kVF1) | ![fillwordsOptions.gif](https://s3.gifyu.com/images/fillwordsOptions.gif)

## Development

In order to develop the application or build android .apk from the sources one should:
1. Clone this repository
2. Install dependencies with `npm install`
3. run Metro bundler with `react-native start`
4. Connect an emulator or physical device via adb, like this (tested with [mEMU](https://www.memuplay.com/)):
	- `adb connect 127.0.0.1:21503`
	- `adb reverse tcp:8081 tcp:8081`
5. build and watch with `react-native run-android`

*Note that app/lib/field.js required for generating and partitioning fields is not included.*

In case of cache issues run `gradlew clean` from the project's android directory
