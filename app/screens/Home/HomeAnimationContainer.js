/* eslint camelcase: ["error", {allow: ["^UNSAFE_"]}] */

import React, { Component } from 'react';
import {
  View,
  Animated,
  Text,
} from 'react-native';
import _ from 'lodash';

import metrics from '../../config/metrics';
import styles from './styles';

const { screenHeight, screenWidth } = metrics;
const raw = ['annual', 'wardrobe', 'outdoor', 'send', 'else', 'wear', 'position', 'publicity', 'you', 'edition', 'master', 'swallow', 'common', 'conclude', 'dangerous', 'assistance', 'or', 'each', 'empire', 'banana', 'glass', 'clean', 'blow', 'week', 'inspire', 'favourite', 'smart', 'frequently', 'powerful', 'slave', 'feature', 'visit', 'size', 'hill', 'culture', 'entire', 'occasionally', 'monthly', 'advance', 'damage', 'agricultural', 'target', 'street', 'political', 'demand', 'reputation', 'consist', 'fairly', 'writer', 'skirt', 'meaning', 'useless', 'scale', 'blank', 'drop', 'handle', 'buyer', 'combination', 'warning', 'interested', 'abroad', 'march', 'portrait', 'water', 'quickly', 'cruel', 'suggest', 'freeze', 'challenge', 'discrimination', 'crime', 'hit', 'fix', 'publish', 'always', 'airport', 'headquarters', 'steal', 'ship', 'procedure', 'for', 'world', 'study', 'active', 'pool', 'dream', 'cook', 'ride', 'let', 'approach', 'change', 'duke', 'before', 'raise', 'challenge', 'shade', 'throat', 'presumably', 'darkness', 'catalogue', 'rub', 'wood', 'obligation', 'carriage', 'sometimes', 'crash', 'participant', 'spot', 'warm', 'cigarette', 'countryside', 'fight', 'evaluate', 'somebody', 'shout', 'various', 'policeman', 'element', 'patient', 'number', 'cell', 'arrangement', 'cancel', 'appointment', 'gas', 'universe', 'onto', 'fulfil', 'decision', 'observe', 'underground', 'enable', 'domestic', 'question', 'abuse', 'poll', 'switch', 'feel', 'block', 'sail', 'express', 'producer', 'evident', 'reserve', 'cricket', 'garden', 'skin', 'worldwide', 'terrible', 'meet', 'range', 'emerge', 'crucial', 'drown', 'part', 'accurate', 'spirit', 'medical', 'building', 'card', 'cheese', 'vote', 'learn', 'menu', 'my', 'beautiful', 'objective', 'theory', 'use', 'recognize', 'release', 'some', 'distinguish', "o'clock", 'offer', 'royal', 'roll', 'fork', 'explain', 'influence', 'cream', 'design', 'hate', 'glory', 'fault', 'brown', 'seem', 'claim', 'ear', 'negotiation', 'support', 'pretend', 'play', 'pet', 'ensure', 'session', 'declare', 'symbol', 'brave', 'aloud', 'imagine', 'fail', 'temper', 'gentle', 'assembly', 'way', 'awareness', 'necessarily', 'develop', 'inside', 'whistle', 'actually', 'human', 'addiction', 'fee', 'resist', 'supper', 'statement', 'title', 'desk', 'cathedral', 'mine', 'rest', 'click', 'call', 'excuse', 'sell', 'occasion', 'tend', 'leaf', 'enquiry', 'global', 'folk', 'your', 'incident', 'introduction', 'rice', 'rough', 'onion', 'joy', 'serious', 'deal', 'suddenly', 'community', 'option', 'main', 'anticipate', 'generally', 'chat', 'illustration', 'licence', 'consider', 'flexible', 'tower', 'including', 'relationship', 'oppose', 'inadequate', 'apple', 'van', 'jewellery', 'ink', 'chips', 'queen', 'increased', 'sandwich', 'champion', 'observation', 'watch', 'internal', 'light', 'basic', 'unfortunately', 'restaurant', 'volume', 'supply', 'speaker', 'found', 'charge', 'sorry', 'for', 'news', 'particle', 'might', 'forgive', 'submit', 'dominate', 'clear', 'population', 'hunger', 'satisfactory', 'mode', 'magazine', 'rail', 'ambition', 'selection', 'interface', 'focus', 'run', 'vary', 'grade', 'yard', 'exactly', 'egg', 'calculate', 'courage', 'due', 'well', 'professor', 'bake', 'standard', 'convenient', 'movie', 'discover', 'power', 'Christian', 'detail', 'data', 'resolution', 'shake', 'mechanism', 'leg', 'contact', 'describe', 'component', 'gap', 'absent', 'stair', 'insist', 'fate', 'floor', 'presence', 'yield', 'recall', 'sack', 'block', 'sugar', 'mile', 'different', 'temporary', 'achieve', 'direction', 'jury', 'recent', 'transaction', 'his', 'comfort', 'present', 'control', 'funeral', 'nice', 'fall', 'secondly', 'nowhere', 'until', 'shape', 'it', 'refer', 'request', 'chemical', 'far', 'limitation', 'mess', 'fox', 'loan', 'walk', 'male', 'store', 'stone', 'country', 'like', 'profession', 'something', 'prisoner', 'bite', 'select', 'agenda', 'tidy', 'parent', 'employ', 'almost', 'bike', 'will', 'practise', 'transport', 'under', 'capacity', 'existing', 'colleague', 'strange', 'dead', 'leadership', 'time', 'soup', 'somehow', 'accommodation', 'conduct', 'come', 'scratch', 'excess', 'owe', 'good', 'interest', 'human', 'edge', 'sheet', 'brief', 'monster', 'gain', 'mind', 'rapidly', 'carpet', 'head', 'violence', 'famous', 'box', 'literary', 'appoint', 'sum', 'sofa', 'empty', 'do', 'negative', 'beg', 'discovery', 'copy', 'birthday', 'planet', 'anybody', 'mixture', 'means', 'beauty', 'nurse', 'dismiss', 'ask', 'particularly', 'constitution', 'contrary', 'cat', 'reserve', 'danger', 'resident', 'financial', 'slowly', 'attractive', 'glad', 'steam', 'translation', 'whilst', 'keen', 'girl', 'wholly', 'assume', 'chamber', 'republic', 'mirror', 'display', 'module', 'context', 'charge', 'real', 'infant', 'tool', 'base', 'flavour', 'wait', 'story', 'bright', 'local', 'would', 'staff', 'wild', 'arrange', 'presumably', 'assist', 'story', 'school', 'advertise', 'record', 'exercise', 'calm', 'welcome', 'shift', 'expert', 'whenever', 'with', 'amongst', 'jump', 'consideration', 'radio', 'convention', 'enemy', 'jacket', 'processor', 'successfully', 'swim', 'flight', 'dodgy', 'hell', 'much', 'sofa', 'display', 'election', 'careless', 'absolutely', 'fur', 'pupil', 'net', 'violent', 'channel', 'hat', 'severe', 'criterion', 'film', 'positive', 'properly', 'plane', 'tradition', 'figure', 'column', 'promotion', 'layer', 'accident', 'verb', 'emergency', 'shade', 'friendship', 'mist', 'criticism', 'lovely', 'dictionary', 'commit', 'championship', 'socialist', 'host', 'entrance', 'we', 'management', 'score', 'predict', 'lead', 'transaction', 'previous', 'result', 'month', 'mass', 'long', 'struggle', 'government', 'correspond', 'grand', 'enormous', 'bury', 'southern', 'vote', 'interview', 'cultural', 'afternoon', 'weight', 'discuss', 'enthusiasm', 'nonsense', 'judge', 'fabric', 'communicate', 'wooden', 'quite', 'clerk', 'shame', 'rid', 'hence', 'read', 'dramatic', 'snow', 'species', 'money', 'cake', 'valuable', 'resistance', 'north', 'successful', 'tap', 'grey', 'party', 'stomach', 'improve', 'automatic', 'pay', 'inspection', 'pig', 'cupboard', 'mark', 'food', 'language', 'beat', 'stretch', 'swallow', 'wage', 'summer', 'origin', 'original', 'person', 'round', 'remain', 'space', 'representation', 'agree', 'detective', 'timetable', 'this', 'east', 'environment', 'ticket', 'whatever', 'production', 'wireless', 'journalist', 'search', 'attribute', 'invite', 'supreme', 'resume', 'dozen', 'security', 'waste', 'night', 'visual', 'evolution', 'bind', 'running', 'firm', 'phrase', 'consultation', 'pass', 'monitor', 'smell', 'shadow', 'museum', 'membership', 'lay', 'sink', 'party', 'control', 'balcony', 'experiment', 'tube', 'speaker', 'aunt', 'warn', 'expect', 'ounce', 'abandon', 'winter', 'content', 'thoroughly', 'fun', 'situated', 'shy', 'could', 'how', 'waste', 'plant', 'tough', 'cotton', 'go', 'sort', 'potential', 'wake', 'outcome', 'library', 'sour', 'dependent', 'adventure', 'symptom', 'life', 'rational', 'appropriate', 'air', 'left', 'demanding', 'recover', 'boss', 'liable', 'drug', 'die', 'greatly', 'moral', 'according', 'aid', 'another', 'atmosphere', 'exact', 'care', 'gallery', 'neutral', 'immediately', 'healthy', 'fat', 'wipe', 'summary', 'feature', 'passive', 'regime', 'training', 'add', 'cord', 'remedy', 'play', 'speak', 'district', 'dry', 'trust', 'disaster', 'distribution', 'pack', 'deaf', 'strategy', 'interview', 'economics', 'involve', 'corporate', 'track', 'pan', 'relevant', 'it', 'holiday', 'boot', 'crisis', 'lion', 'representative', 'citizen', 'advice', 'modest', 'information', 'build', 'witness', 'office', 'problem', 'contribute', 'dark', 'ill', 'mist', 'why', 'protect', 'avoid', 'album', 'pride', 'comprehensive', 'seek', 'interior', 'work', 'eventually', 'kind', 'strip', 'personally', 'grandmother', 'steel', 'safe', 'sand', 'off', 'yes', 'being', 'press', 'old', 'current', 'export', 'combine', 'chief', 'bridge', 'instance', 'preference', 'here', 'bomb', 'largely', 'study', 'outdoor', 'health', 'perhaps', 'unit', 'closure', 'check', 'criminal', 'war', 'sheet', 'own', 'travel', 'smooth', 'ok', 'clock', 'create', 'setting', 'bank', 'surprising', 'finish', 'base', 'loaf', 'principle', 'bloody', 'dare', 'tear', 'little', 'sign', 'wrap', 'gathering', 'massive', 'memory', 'suggestion', 'scrape', 'publication', 'plant', 'report', 'seriously', 'goods', 'parliamentary', 'blank', 'tube', 'dog', 'cent', 'wall', 'tie', 'your', 'visible', 'close', 'mental', 'metal', 'machine', 'medicine', 'signal', 'description', 'spoon', 'politics', 'sight', 'intervention', 'hit', 'rape', 'bar', 'ripe', 'revolutionary', 'urgent', 'of', 'fellow', 'right', 'suitable', 'few', 'requirement', 'habit', 'respect', 'virtually', 'year', 'entertainment', 'secret', 'change', 'sort', 'retirement', 'reception', 'report', 'proper', 'murmur', 'matter', 'progress', 'believe', 'nail', 'compromise', 'charity', 'rule', 'quarter', 'advance', 'about', 'wander', 'mine', 'sentence', 'basket', 'wound', 'match', 'soldier', 'pilot', 'foundation', 'major', 'allowance', 'qualification', 'circle', 'nevertheless', 'league', 'marriage', 'rope', 'parliament', 'sound', 'postcard', 'room', 'shelf', 'competitor', 'step', 'film', 'dealer', 'customs', 'agreement', 'interface', 'reasonably', 'handsome', 'performance', 'talented', 'consistent', 'protest', 'extensive', 'crash', 'round', 'trade', 'supply', 'rarely', 'myth', 'excitement', 'examine', 'dress', 'usually', 'soft', 'organisation', 'sex', 'interpreter', 'plain', 'recommendation', 'shock', 'certificate', 'brick', 'floor', 'wet', 'ideology', 'space', 'season', 'wife', 'shell', 'uniform', 'earth', 'liberal', 'contact', 'ideal', 'uniform', 'continent', 'humour', 'silk', 'honest', 'electronic', 'worry', 'dinner', 'additional', 'address', 'education', 'compete', 'great', 'ourselves', 'too', 'fall', 'tip', 'member', 'scientific', 'horn', 'toy', 'earn', 'hi', 'engage', 'imagination', 'late', 'stick', 'quick', 'strength', 'expand', 'illustrate', 'hole', 'wealth', 'federal', 'sweater', 'journal', 'computer', 'twin', 'flow', 'client', 'pain', 'specialist', 'pattern', 'intend', 'unusual', 'rush', 'sufficiently', 'glance', 'once', 'formation', 'lonely', 'hall', 'somewhere', 'bedroom', 'relation', 'permanent', 'pardon', 'numerous', 'democratic', 'feed', 'present', 'stupid', 'intelligence', 'injure', 'evening'];
const fontSize = Math.floor(screenHeight / 40);
const lettersPerLine = Math.ceil(screenWidth / fontSize);
const linesPerPage = Math.ceil(screenHeight / fontSize) + 13;
const lettersPerPage = lettersPerLine * linesPerPage;
const { words } = raw.reduce((acc, cur) => {
  if (cur.length + acc.letters < lettersPerPage) {
    return { letters: acc.letters + cur.length, words: [...acc.words, cur] };
  }
  return acc;
}, { letters: 0, words: [] });

const arr = [];
for (let i = 0; i < words.length; i++) {
  arr.push(i);
}

class HomeAnimationContainer extends Component {
  constructor() {
    super();
    this.animatedValue = []; // (new Array(100)).map((value, index) => new Animated.Value(0));
    arr.forEach((value) => {
      this.animatedValue[value] = new Animated.Value(0.1);
    });
  }

  componentWillUnmount() {
    console.log('unmounting homeview animation');
  }

  componentDidMount() {
    this.animate();
  }

  animate() {
    const samples = _.sampleSize(arr, 25);

    const animations = samples.map(item => Animated.timing(
      this.animatedValue[item],
      {
        toValue: 0.5,
        duration: 1500,
        useNativeDriver: true,
      },
    ));
    Animated.parallel(animations).start(() => {
      const animations = samples.map(item => Animated.timing(
        this.animatedValue[item],
        {
          toValue: 0.1,
          duration: 1500,
          useNativeDriver: true,
        },
      ));
      Animated.parallel(animations).start(() => this.animate());
    });
  }

  render() {
    return (
      <View
        style={styles.background}
        removeClippedSubviews
      >
        {words.map((item, index) => (
          <Animated.View
            key={String(index)}
            style={{
              opacity: this.animatedValue[index],
            }}
          >
            <Text style={{ fontSize }}>{item}</Text>
          </Animated.View>
        ))}
      </View>
    );
  }
}

export default HomeAnimationContainer;
