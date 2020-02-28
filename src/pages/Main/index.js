import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import logo from '~/assets/logo.png';
import IconFont from 'react-native-vector-icons/FontAwesome5';
import api from '~/services/api';
import {
  Container,
  Card,
  CardContent,
  CardDetail,
  CardImage,
  Logo,
  TextPrimary,
  Flex,
  BackgroundTipo,
  Tipo,
  Avaliation,
  Separation,
  Info
} from './styles';

export default class Main extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: () => (
        <IconFont name="user" style={{ marginRight:10}} size={25} color="#757575" />),
    headerLeft: () => (
        <Image source={logo} style={{width:50, height:40, marginLeft:10}} />),
  title: "Tonolucro",
  headerStyle: {
    backgroundColor: "#fff",
    height: 70,
    elevation:0
  },
  headerTintColor: "#ec0007",
  headerTitleStyle: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20
  },
  headerTitleAlign: 'center'
  })

  state = {
    estabelecimento: [],
    destaque: [],
    isLoading: false
  };
  componentDidMount() {
    this.loadEstabelecimento();
  }
  loadEstabelecimento = async () => {
    this.setState({ isLoading: true });
    const response = await api.get('/estabelecimento');
    const repositorio = await response.data;
    this.setState({ estabelecimento: repositorio, isLoading: false });
  }
  loadDestaque = async () => {
    const response = await api.get('/destaque');
    const repositorio = await response.data;
    this.setState({ destaque: repositorio });
  }
  render() {
    return (
      <Container >
        {this.state.isLoading ?
          <ActivityIndicator style={{ flex: 1 }} size="large" color="#ec0007" animating={this.state.isLoading} />
          :
          <FlatList style={{ padding: 15 }}
            data={this.state.estabelecimento}
            ItemSeparatorComponent= {()=><Separation></Separation>}
            renderItem={({ item }) =>
              <Card>
                <CardContent>
                  <CardImage>
                    <Logo source={{ uri: item.imagem }} />
                  </CardImage>
                  <CardDetail>
                    <TextPrimary>{item.nome}</TextPrimary>
                    <Flex>
                      <BackgroundTipo>
                        <Tipo>{item.tipo}</Tipo>
                      </BackgroundTipo>
                      <Icon name="star" size={18} color="#707070" />
                      <Avaliation> {item.estrelas}</Avaliation>
                    </Flex>
                    <Info><Icon name="location-on" color="#777777" size={16} /> {item.local}</Info>
                    <Info><Icon name="motorcycle" color="#777777" size={16} /> Tonolucro (R$ {item.valorEntrega})</Info>
                  </CardDetail>
                </CardContent>
              </Card>
            }
          />
        }
      </Container>
    );
  }
}
