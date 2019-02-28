import NavigationService from '../navigation/NavigationService';

export function navigateToHome(params) {
  NavigationService.navigate('Home', params);
}

export function navigateToGame(params) {
  NavigationService.navigate('Game', params);
}

export function navigateToOptions(params) {
  NavigationService.navigate('Options', params);
}
