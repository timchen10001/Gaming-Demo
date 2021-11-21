import {
  TextureLoader,
  NearestFilter,
  LinearMipMapLinearFilter,
} from 'three';
import dirtImg from '@@static/images/dirt.jpg';
import grassImg from '@@static/images/grass.jpg';
import glassImg from '@@static/images/glass.png';
import logImg from '@@static/images/log.jpg';
import woodImg from '@@static/images/wood.png';

export const dirt = new TextureLoader().load(dirtImg);
export const grass = new TextureLoader().load(grassImg);
export const glass = new TextureLoader().load(glassImg);
export const wood = new TextureLoader().load(woodImg);
export const log = new TextureLoader().load(logImg);

dirt.magFilter = NearestFilter;
dirt.minFilter = LinearMipMapLinearFilter;
grass.magFilter = NearestFilter;
grass.minFilter = LinearMipMapLinearFilter;
wood.magFilter = NearestFilter;
wood.minFilter = LinearMipMapLinearFilter;
log.magFilter = NearestFilter;
log.minFilter = LinearMipMapLinearFilter;
