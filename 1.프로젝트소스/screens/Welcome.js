import React, { Component } from 'react'
import { Animated, Dimensions, Image, FlatList, Modal, StyleSheet, ScrollView } from 'react-native';

import { Button, Block, Text } from '../components';
import { theme } from '../constants';

const { width, height } = Dimensions.get('window');

class Welcome extends Component {
  static navigationOptions = {
    header: null,
  }

  scrollX = new Animated.Value(0);

  state = {
    showTerms: false,
  }

  renderTermsService() {
    return (
      <Modal animationType="slide" visible={this.state.showTerms} onRequestClose={() => this.setState({ showTerms: false })}>
        <Block padding={[theme.sizes.padding * 2, theme.sizes.padding]} space="between">
          <Text h2 light>Sns service</Text>

          <ScrollView style={{ marginVertical: theme.sizes.padding }}>
            <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
              1. 당신의 서비스 이용은 전적으로 당신의 책임이다. 서비스는 "있는 그대로" 그리고 "있는 그대로"로 제공된다..
            </Text>
            <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
              2. Expo 서비스 지원은 영어로만 제공되며, 이메일을 통해 제공됨.
            </Text>
            <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
              3. Expo는 타사 벤더 및 호스팅 파트너를 사용하여 서비스 실행에 필요한 하드웨어, 소프트웨어, 네트워킹, 스토리지 및 관련 기술을 제공한다는 점을 이해하십시오.
            </Text>
            <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
              4. 서비스, 엑스포 또는 다른 엑스포 서비스와 연관되어 있음을 거짓으로 암시하도록 서비스를 수정, 조정 또는 해킹하거나 다른 웹 사이트를 수정해서는 안 된다..
            </Text>
            <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
              5.당신은 당신의 조직 페이지, 개인 페이지 또는 프로젝트 페이지를 호스트하기 위한 목적으로만 Expo Pages 정적 호스팅 서비스를 다른 목적으로만 사용할 수 엑스포 페이지는 엑스포 상표권이나 기타 권리를 침해하거나 해당법을 위반하여 사용할 수 없다. Expo는 항상 귀사에 대한 책임 없이 Expo 하위 도메인을 회수할 수 있는 권한을 보유함.
            </Text>
            <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
              6. 귀하는 Expo의 명시적 서면 허가 없이 서비스의 일부, 사용 또는 서비스 액세스를 복제, 복제, 복사, 판매, 재판매 또는 이용하지 않기로 동의함.
            </Text>
            <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
              7.우리는 우리의 유일한 재량으로 판단되는 내용이 불법, 공격적, 위협적, 명예훼손적, 명예훼손적, 명예훼손적, 음란적, 음란적 또는 그 밖의 다른 방법으로 유해하거나 어떤 당사자의 지적 재산이나 본 서비스 약관을 위반하거나 위반할 수 있지만, 삭제할 의무는 없다.
            </Text>
            <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
              8.Expo 고객, 직원, 회원 또는 임원의 구두, 물리적, 서면 또는 기타 학대(학대 또는 보복 위협 포함)로 인해 즉시 계정 해지.
            </Text>
            <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
              9. 당신은 당신의 컨텐츠를 포함한 서비스의 기술적 처리와 전송이 암호화되지 않은 채 전송될 수 있고 (a) 다양한 네트워크를 통한 전송을 수반할 수 있으며, (b) 접속 네트워크나 장치의 기술적 요구 사항을 준수하고 적응하기 위한 변경이라는 것을 이해한다.
            </Text>
            <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
              10. 요청하지 않은 전자 메일, SMS 또는 "스팸" 메시지를 업로드, 게시, 호스트 또는 전송할 수 없음.
            </Text>
          </ScrollView>

          <Block middle padding={[theme.sizes.base / 2, 0]}>
            <Button gradient onPress={() => this.setState({ showTerms: false })}>
              <Text center white>I understand</Text>
            </Button>
          </Block>
        </Block>
      </Modal>
    )
  }

  renderIllustrations() {
    const { illustrations } = this.props;

    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment="center"
        data={illustrations}
        extraDate={this.state}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({ item }) => (
          <Image
            source={item.source}
            resizeMode="contain"
            style={{ width, height: height / 2, overflow: 'visible' }}
          />
        )}
        onScroll={
          Animated.event([{
            nativeEvent: { contentOffset: { x: this.scrollX } }
          }])
        }
      />
    )
  }

  renderSteps() {
    const { illustrations } = this.props;
    const stepPosition = Animated.divide(this.scrollX, width);
    return (
      <Block row center middle style={styles.stepsContainer}>
        {illustrations.map((item, index) => {
          const opacity = stepPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.4, 1, 0.4],
            extrapolate: 'clamp',
          });

          return (
            <Block
              animated
              flex={false}
              key={`step-${index}`}
              color="gray"
              style={[styles.steps, { opacity }]}
            />
          )
        })}
      </Block>
    )
  }

  render() {
    const { navigation } = this.props;

    return (
      <Block>
        <Block center bottom flex={0.4}>
          <Text h1 center bold>
            SNS.
            <Text h1 primary> Skhu'net</Text>
          </Text>
          <Text h3 gray2 style={{ marginTop: theme.sizes.padding / 2 }}>
            enjoy the SNS
          </Text>
        </Block>
        <Block center middle>
          {this.renderIllustrations()}
          {this.renderSteps()}
        </Block>
        <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
          <Button gradient onPress={() => navigation.navigate('Login')}>
            <Text center semibold white>로그인</Text>
          </Button>
          <Button shadow onPress={() => navigation.navigate('SignUp')}>
            <Text center semibold>회원가입</Text>
          </Button>
          <Button onPress={() => this.setState({ showTerms: true })}>
            <Text center caption gray>서비스 공지</Text>
          </Button>
        </Block>
        {this.renderTermsService()}
      </Block>
    )
  }
}

Welcome.defaultProps = {
  illustrations: [
    { id: 1, source: require('../assets/images/illustration_1.png') },
    { id: 2, source: require('../assets/images/illustration_2.png') },
    { id: 3, source: require('../assets/images/illustration_3.png') },
  ],
};

export default Welcome;

const styles = StyleSheet.create({
  stepsContainer: {
    position: 'absolute',
    bottom: theme.sizes.base * 3,
    right: 0,
    left: 0,
  },
  steps: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2.5,
  },
})

