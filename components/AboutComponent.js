import React, {Component} from 'react';
import { ScrollView, Text, FlatList} from 'react-native';
import { Card, ListItem} from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

const mapStateToProps = state => {
    return {
        partners: state.partners
    };
};

class About extends Component {
    constructor(props){
        super(props);
    }

    static navigationOptions = {
        title: 'About Us'
    }

    render(){
        const renderPartner = ({item}) => <ListItem 
                    title={item.name} 
                    subtitle={item.description} 
                    leftAvatar={{source: {uri: baseUrl + item.image}}}
                />
        

        

                /* this is how they do this code in the lessons */
        // if(this.props.partners.isLoading){
        //     return (
        //         <ScrollView>
        //             <Mission />
        //             <Card title='Communtiy Partners'>
        //                 <Loading />
        //             </Card>
        //         </ScrollView>
        //     )
        // }
        // if(this.props.partners.errMess){
        //     return (
        //         <ScrollView>
        //             <Mission />
        //             <Card title='Communtiy Partners'>
        //                 <Text>{this.props.partners.errMess}</Text>
        //             </Card>
        //         </ScrollView>
        //     )
        // }

        // This is how I thought to do it//
        const loading = <Loading />;
        const error = <Text>{this.props.partners.errMess}</Text>

        const getOutput = () => {
            if(this.props.partners.isLoading) return loading
            if(this.props.partners.errMess) return error
            return <FlatList data={this.props.partners.partners} keyExtractor={item => item.id.toString()} renderItem={renderPartner}></FlatList>
        }

        console.log(this.props.partners);
        return (
            <ScrollView>
                <Mission />
                <Card title="Community Partners">
                    {getOutput()}
                </Card>
            </ScrollView>
        );
    }
}

function Mission(){
    return <Card title="Our Mission"><Text>We present a curated database of the best campsites in the vast woods and backcountry of the World Wide Web Wilderness. We increase access to adventure for the public while promoting safe and respectful use of resources. The expert wilderness trekkers on our staff personally verify each campsite to make sure that they are up to our standards. We also present a platform for campers to share reviews on campsites they have visited with each other.</Text></Card>
}

export default connect(mapStateToProps)(About);