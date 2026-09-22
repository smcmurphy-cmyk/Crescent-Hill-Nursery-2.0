import React, { useState, useMemo } from 'react';
import { AvailabilityItem } from '../types';
import { 
  Search, 
  Printer, 
  Calendar, 
  ArrowLeft, 
  Download, 
  Filter, 
  DollarSign, 
  PackageCheck,
  Building2,
  LogOut,
  ShieldCheck,
  Lock
} from 'lucide-react';

export const AVAILABILITY_DATA: AvailabilityItem[] = [
  { name: "Abutilon 'Creameleon' NEW2026 CHN Intro", qty1g: 1, price1g: "$6.95", description: "medium, bnb, cream-yellow" },
  { name: "Abutilon 'Crouching Tiger' stk.", qty1g: 5, price1g: "$6.95", description: "medium" },
  { name: "Abutilon 'Frieda' stk.", qty1g: 10, price1g: "$6.95", description: "*medium, buds/ blm" },
  { name: "Abutilon 'Frieda' stk.", qty2g: 25, price2g: "$17.75", description: "medium, buds/blm" },
  { name: "Abutilon megapotamicum stk.", qty1g: 10, price1g: "$6.95", description: "medium, buds/blm" },
  { name: "Abutilon megapotamicum stk.", qty2g: 5, price2g: "$17.75", description: "medium, buds/blm" },
  { name: "Abutilon pictum 'Mardi Gras' stk.", qty1g: 10, price1g: "$6.95", description: "medium, spotted variegated" },
  { name: "Abutilon pictum 'Thompsonii' stk.", qty1g: 25, price1g: "$6.95", description: "*medium, buds/blm" },
  { name: "Abutilon pictum 'Thompsonii' stk.", qty2g: 15, price2g: "$17.75", description: "*medium-full, buds/blm" },
  { name: "Abutilon 'Savitzii' stk.", qty1g: 20, price1g: "$6.95", description: "medium, bright" },
  { name: "Abutilon 'Strawberry Ice' NEW2023 CHN Intro", qty1g: 35, price1g: "$6.95", description: "medium, buds, some blm" },
  { name: "Abutilon 'Strawberry Ice' NEW2023 CHN Intro", qty2g: 14, price2g: "$17.75", description: "medium, buds, some blm" },
  { name: "Abutilon 'Red Dragon' NEW 2022 CHN Intro", qty1g: 50, price1g: "$6.95", description: "*medium, buds/blm" },
  { name: "Abutilon 'Rip Van Periwinkle' NEW2023 CHN Intro", qty1g: 20, price1g: "$6.95", description: "*medium, bnb" },
  { name: "Abutilon 'Rip Van Periwinkle' NEW2023 CHN Intro", qty2g: 15, price2g: "$17.75", description: "*medium, buds/blm" },
  { name: "Abutilon 'Tiger Eye' stk.", qty1g: 45, price1g: "$6.95", description: "medium, some buds" },
  { name: "Abutilon 'Victor Reiter' stk.", qty2g: 8, price2g: "$17.75", description: "*medium-full, bnb" },
  { name: "Acacia cognata 'Cousin Itt' PPAF", qty5g: 125, price5g: "$24.95", description: "*medium-full, nice foliage" },
  { name: "Acacia cognata 'Cousin Itt' PPAF", qty2g: 31, price2g: "$59.95", sizeNote2g: "15g", description: "medium" },
  { name: "Acacia c. 'Purple Rain' NEW2023 CHN Intro", qty5g: 107, price5g: "$29.95", description: "*medium, dark purple tips" },
  { name: "Acacia c. 'Purple Rain' NEW2023 CHN Intro", qty2g: 69, price2g: "$64.95", sizeNote2g: "15g", description: "**nice +" },
  { name: "Acacia c. 'Wavy Gravy' NEW2023 CHN Intro", qty2g: 25, price2g: "$64.95", sizeNote2g: "15g", description: "*full, nice foliage" },
  { name: "Acacia covenyi stk.", qty1g: 15, price1g: "$9.95", description: "*medium-full" },
  { name: "Acacia covenyi stk.", qty2g: 47, price2g: "$24.95", description: "*full, 6'+, NICE" },
  { name: "Acacia covenyi", qty2g: 12, price2g: "$75.00", sizeNote2g: "15g", description: "medium" },
  { name: "Acacia vestita stk.", qty5g: 32, price5g: "$22.95", description: "medium" },
  { name: "Aeonium 'Glenn Davidson'", qty2g: 2, price2g: "$19.95", description: "full" },
  { name: "Aeonium simsii", qty1g: 23, price1g: "$6.95", description: "full" },
  { name: "Agapanthus sp. (SA dwarf dark purple)", qty1g: 195, price1g: "$5.95", description: "medium, some buds/blm" },
  { name: "Agave attenuata", qty1g: 56, price1g: "$7.95", description: "*full, lush" },
  { name: "Agave attenuata", qty2g: 5, price2g: "$20.95", description: "medium" },
  { name: "Agave attenuata 'Ray of Light' PP21,854", qty1g: 25, price1g: "$10.45", description: "*full" },
  { name: "Agave attenuata 'Ray of Light' PP21,854", qty5g: 8, price5g: "$25.95", description: "full" },
  { name: "Agave 'Blue Flame'", qty2g: 105, price2g: "$5.95", sizeNote2g: "6\" cups", description: "*full" },
  { name: "Agave 'Blue Flame'", qty1g: 568, price1g: "$7.95", description: "*full, lush" },
  { name: "Agave 'Blue Glow'", qty2g: 173, price2g: "$6.25", sizeNote2g: "6\" cups", description: "*full" },
  { name: "Agave 'Blue Glow'", qty1g: 856, price1g: "$8.95", description: "*medium-full" },
  { name: "Agave 'Snow Glow' variegated NEW 2025", qty1g: 600, price1g: "$12.95", description: "*medium-full" },
  { name: "Agave 'Snow Glow' variegated NEW 2025", qty2g: 45, price2g: "$24.95", description: "*full, bright" },
  { name: "Agave 'Snow Glow' variegated NEW 2025", qty5g: 2, price5g: "$32.95", description: "medium-full" },
  { name: "Agave 'Blue Waves'", qty1g: 81, price1g: "$10.95", description: "*full, Nice" },
  { name: "Agave 'Confederate Rose'", qty1g: 33, price1g: "$5.95", description: "*full, Hardy" },
  { name: "Agave guadalajarana", qty1g: 53, price1g: "$8.95", description: "*prime, bright orange spines" },
  { name: "Agave guadalajarana", qty2g: 5, price2g: "$18.95", description: "*full" },
  { name: "Agave ovatifolia", qty1g: 150, price1g: "$8.95", description: "small-medium" },
  { name: "Agave parryi var. parryi", qty1g: 118, price1g: "$6.95", description: "*full" },
  { name: "Agave parryi var. parryi", qty2g: 40, price2g: "$17.95", description: "full" },
  { name: "Agave parryi var. parryi", qty5g: 12, price5g: "$20.95", description: "full" },
  { name: "Agave parryi var. parryi", qty2g: 48, price2g: "$50.00", sizeNote2g: "7g", description: "full" },
  { name: "Agave parryi var. parryi", qty2g: 14, price2g: "$60.00", sizeNote2g: "15g", description: "full" },
  { name: "Agave parryi var. truncata", qty1g: 40, price1g: "$11.95", description: "medium" },
  { name: "Agave parryi var. truncata", qty5g: 66, price5g: "$26.95", description: "full" },
  { name: "Agave potatorum 'Kichiokan'", qty1g: 42, price1g: "$11.95", description: "*medium-full" },
  { name: "Agave potatorum 'Kichiokan'", qty2g: 5, price2g: "$21.95", description: "*full" },
  { name: "Agave schidigera 'Royal Flush' PP31138", qty1g: 197, price1g: "$11.95", description: "*medium-full, variegated" },
  { name: "Agave titanota 'Snaggle Tooth'", qty2g: 20, price2g: "$21.95", description: "*medium, rare" },
  { name: "Agave victoriae-reginae", qty1g: 10, price1g: "$11.95", description: "medium" },
  { name: "Aloe 'Delta Lights'", qty1g: 51, price1g: "$6.95", description: "medium-full, some buds" },
  { name: "Aloe juvenna", qty2g: 39, price2g: "$5.95", sizeNote2g: "6\" cups", description: "medium-full" },
  { name: "Anigozanthos 'Bush Ballad'", qty1g: 30, price1g: "$8.95", description: "small-medium, bnb" },
  { name: "Anigozanthos 'Bush Gold'", qty1g: 115, price1g: "$8.95", description: "medium, buds/blm" },
  { name: "Anigozanthos 'Bush Sunset'", qty1g: 13, price1g: "$8.95", description: "medium-full" },
  { name: "Anigozanthos 'Celebrations Carnivale' PP34,960", qty1g: 203, price1g: "$8.95", description: "*prime, buds/blm" },
  { name: "Anigozanthos 'Celebrations Fireworks' PPAF", qty1g: 295, price1g: "$8.95", description: "*full, buds/blm" },
  { name: "Anigozanthos 'Celebrations Masquerade' PP34860", qty1g: 152, price1g: "$8.95", description: "small, buds" },
  { name: "Anigozanthos 'Dwarf Pink'", qty1g: 10, price1g: "$8.95", description: "medium, buds/blm" },
  { name: "Anigozanthos 'Firehouse Orange'", qty1g: 223, price1g: "$8.95", description: "*medium, buds" },
  { name: "Anigozanthos 'Kanga Burgundy'", qty5g: 4, price5g: "$19.95", description: "medium, buds/blm" },
  { name: "Anigozanthos 'Kanga Cherry'", qty1g: 85, price1g: "$8.95", description: "full" },
  { name: "Anigozanthos 'Kanga Cherry'", qty5g: 27, price5g: "$19.95", description: "**medium-full, bnb" },
  { name: "Anigozanthos 'Landscape Lilac'", qty1g: 199, price1g: "$8.95", description: "*medium-full, buds, some blm" },
  { name: "Anigozanthos 'Landscape Lilac'", qty5g: 9, price5g: "$19.95", description: "*medium-full, bnb" },
  { name: "Anigozanthos 'Regal Velvet'", qty1g: 120, price1g: "$8.95", description: "medium" },
  { name: "Anigozanthos 'Regal Velvet'", qty5g: 8, price5g: "$19.95", description: "medium, buds" },
  { name: "Anigozanthos 'Tenacity'", qty1g: 150, price1g: "$8.95", description: "*medium-full, bnb" },
  { name: "Anigozanthos 'Tequila Sunrise'", qty1g: 90, price1g: "$8.95", description: "medium, some buds" },
  { name: "Anigozanthos 'Tequila Sunrise'", qty5g: 7, price5g: "$19.95", description: "medium-full, buds/blm" },
  { name: "Anigozanthos 'Yellow Gem'", qty1g: 20, price1g: "$8.95", description: "full" },
  { name: "Arctostaphylos edmundsii 'Carmel Sur'", qty1g: 174, price1g: "$6.45", description: "*full" },
  { name: "Arctostaphylos manzanita 'Dr. Hurd'", qty1g: 117, price1g: "$7.95", description: "small-medium" },
  { name: "Arctostaphylos uva-ursi ‘Vancouver Jade’", qty1g: 54, price1g: "$6.45", description: "full" },
  { name: "Arctostaphylos uva-ursi ‘Wood’s Compact’", qty1g: 156, price1g: "$6.45", description: "*full" },
  { name: "Arctostaphylos 'Emerald Carpet'", qty1g: 185, price1g: "$6.25", description: "medium" },
  { name: "Asplenium antiquem 'Crissie'", qty1g: 67, price1g: "$7.50", description: "medium" },
  { name: "Asplenium antiquem 'Hurricane' PP28,746", qty1g: 24, price1g: "$8.95", description: "medium" },
  { name: "Asplenium scolopendrium", qty1g: 68, price1g: "$7.25", description: "*full, hardy fern, unique" },
  { name: "Asplenium scolopendrium ‘Angustifolia’", qty1g: 82, price1g: "$7.25", description: "medium, unique" },
  { name: "Askidosperma paniculatum", qty1g: 40, price1g: "$8.50", description: "*full, dwarf Restio, tough" },
  { name: "Astelia banksii", qty5g: 32, price5g: "$24.95", description: "*full" },
  { name: "Astelia chathamica 'Silver Spear'", qty5g: 114, price5g: "$24.95", description: "*medium-full" },
  { name: "Athanasia pinnata", qty1g: 5, price1g: "$6.95", description: "medium-full" },
  { name: "Athanasia pinnata", qty5g: 30, price5g: "$20.95", description: "medium, some buds" },
  { name: "Athyrium filix-femina 'Lady in Red'", qty1g: 11, price1g: "$7.25", description: "*full, nice foliage" },
  { name: "Banksia blechnifolia", qty5g: 115, price5g: "$34.95", description: "medium" },
  { name: "Banksia praemorsa Red Flower", qty5g: 91, price5g: "$34.95", description: "medium" },
  { name: "Beschorneria yuccoides 'Flamingo Glow'PP22162", qty1g: 140, price1g: "$10.45", description: "full" },
  { name: "Beschorneria yuccoides 'Flamingo Glow'PP22162", qty5g: 53, price5g: "$23.95", description: "small-medium" },
  { name: "Blechnum brasiliensis (Dwarf tree fern)", qty1g: 17, price1g: "$7.50", description: "*medium, red new growth" },
  { name: "Blechnum brasiliensis (Dwarf tree fern)", qty5g: 20, price5g: "$22.95", description: "*medium-full" },
  { name: "Blechnum gibbum", qty1g: 159, price1g: "$7.25", description: "*full" },
  { name: "Blechnum gibbum", qty5g: 72, price5g: "$20.95", description: "*full, nice foliage" },
  { name: "Blechnum spicant", qty1g: 270, price1g: "$7.50", description: "*medium-full, nice foliage" },
  { name: "Blechnum spicant", qty2g: 14, price2g: "$19.95", sizeNote2g: "(3 Gallon)", description: "*medium-full" },
  { name: "Cannomois grandis", qty2g: 19, price2g: "$90.00", sizeNote2g: "(15 Gallon)", description: "**full, Nice" },
  { name: "Carex oshimensis 'Evergold'", qty1g: 237, price1g: "$6.15", description: "**prime, nice color" },
  { name: "Carex oshimensis 'Everillo' PP 21,002", qty1g: 445, price1g: "$6.25", description: "**prime, pure yellow" },
  { name: "Carex oshimensis 'Eversheen' PP 25,938", qty1g: 91, price1g: "$6.25", description: "*full, nice color" },
  { name: "Carex testacea 'Prairie Fire'", qty1g: 248, price1g: "$6.15", description: "medium-full, bright orange" },
  { name: "Ceanothus 'Dark Star'", qty1g: 145, price1g: "$6.55", description: "medium-full, some bnb" },
  { name: "Ceanothus griseus var. horizontalis 'Diamond Heights'", qty1g: 297, price1g: "$6.95", description: "*full, bright" },
  { name: "Ceanothus griseus var. horizontalis 'Diamond Heights'", qty5g: 85, price5g: "$20.95", description: "*medium-full, bright" },
  { name: "Ceanothus hearstiorum", qty1g: 40, price1g: "$6.75", description: "*full" },
  { name: "Choisya ternata", qty1g: 10, price1g: "$6.95", description: "full" },
  { name: "Choisya ternata", qty5g: 96, price5g: "$21.95", description: "*full, waxy foliage" },
  { name: "Choisya ternata 'Sundance'", qty1g: 5, price1g: "$6.95", description: "full" },
  { name: "Choisya ternata 'Sundance'", qty5g: 82, price5g: "$21.95", description: "*full, bright yellow!" },
  { name: "Chondropetalum elephantinum", qty5g: 67, price5g: "$19.95", description: "full" },
  { name: "Chondropetalum tectorum", qty5g: 30, price5g: "$19.95", description: "full, landscape" },
  { name: "Chondropetalum tectorum - dwarf form", qty1g: 10, price1g: "$7.95", description: "*medium" },
  { name: "Chondropetalum tectorum - dwarf form", qty5g: 122, price5g: "$22.95", description: "*full, nice banding" },
  { name: "Chondropetalum tectorum - red bract form", qty5g: 86, price5g: "$22.95", description: "*full, dwarf, nice banding" },
  { name: "Chrysocephalum apiculatum 'Silver and Gold'", qty1g: 65, price1g: "$5.95", description: "medium-full, buds/blm" },
  { name: "Cordyline 'Cha Cha' PP24,028", qty2g: 2, price2g: "$25.95", description: "medium" },
  { name: "Cordyline australis", qty1g: 8, price1g: "$8.95", description: "*full, pure green" },
  { name: "Cordyline australis 'Charlie Boy' PP20,139", qty1g: 261, price1g: "$11.95", description: "**full, color +" },
  { name: "Cordyline australis 'Charlie Boy' PP20,139", qty5g: 45, price5g: "$24.95", description: "medium, great color" },
  { name: "Cordyline australis 'Coral' PP19,964", qty1g: 18, price1g: "$10.95", description: "*medium-full" },
  { name: "Cordyline australis 'Coral' PP19,964", qty5g: 31, price5g: "$24.95", description: "*full, nice color" },
  { name: "Cordyline australis 'Jive' PP25,123", qty1g: 76, price1g: "$10.45", description: "medium, nice accent" },
  { name: "Cordyline australis 'Paso Doble' PPAF", qty1g: 70, price1g: "$10.95", description: "**medium-full, nice color" },
  { name: "Cordyline australis 'Paso Doble' PPAF", qty2g: 30, price2g: "$19.95", description: "**full, hot pink" },
  { name: "Cordyline australis 'Paso Doble' PPAF", qty5g: 23, price5g: "$24.95", description: "**medium-full, hot pink" },
  { name: "Cordyline australis 'Torbay Dazzler'", qty1g: 120, price1g: "$10.45", description: "medium" },
  { name: "Cordyline australis 'Torbay Dazzler'", qty5g: 62, price5g: "$24.95", description: "medium, nice color" },
  { name: "Cordyline banksii 'Electric Pink' PP19,213", qty1g: 139, price1g: "$11.95", description: "*medium-full, great color" },
  { name: "Cordyline banksii 'Electric Pink' PP19,213", qty2g: 45, price2g: "$19.95", description: "medium, nice color" },
  { name: "Cordyline banksii 'Electric Pink' PP19,213", qty5g: 80, price5g: "$26.95", description: "*full, bright pink" },
  { name: "Cordyline 'Electric Flash' PP26,267", qty5g: 35, price5g: "$26.95", description: "*medium-full, bright!" },
  { name: "Correa pulchella 'Pink Eyre'", qty1g: 33, price1g: "$6.50", description: "*medium-full, buds/blm" },
  { name: "Correa 'Wyn's Wonder'", qty1g: 20, price1g: "$6.50", description: "medium, variegated" },
  { name: "Crassula corymbulosa", qty2g: 25, price2g: "$5.95", sizeNote2g: "6\" cups", description: "medium" },
  { name: "Crassula ovata 'Hobbit'", qty1g: 49, price1g: "$6.95", description: "medium" },
  { name: "Crassula perforata", qty2g: 47, price2g: "$5.95", sizeNote2g: "6\" cups", description: "medium-full" },
  { name: "Crassula rupestris subsp. Marnieriana", qty1g: 15, price1g: "$7.25", description: "medium-full, foliage++" },
  { name: "Ctenanthe oppenheimiana 'Tricolour'", qty1g: 10, price1g: "$6.95", description: "*prime, indoor/shade, tricolor" },
  { name: "Cuphea ignea 'David Verity'", qty2g: 46, price2g: "$7.95", description: "*medium-full, bnb" },
  { name: "Cuphea llavea", qty1g: 25, price1g: "$6.25", description: "medium, bnb" },
  { name: "Cuphea 'Starfire Pink'", qty2g: 40, price2g: "$8.95", description: "*medium-full, bnb" },
  { name: "Delosperma c. 'Jewel of Desert Amethyst' PP27,013", qty2g: 109, price2g: "$5.75", sizeNote2g: "6\" cups", description: "medium, buds/blm" },
  { name: "Delosperma c. 'Jewel of Desert Garnet PP23,471", qty2g: 100, price2g: "$5.75", sizeNote2g: "6\" cups", description: "*full, buds/blm" },
  { name: "Delosperma c. 'Jewel of Desert Grenade PP27,014", qty2g: 109, price2g: "$5.75", sizeNote2g: "6\" cups", description: "medium" },
  { name: "Delosperma 'Ocean Orange Vibe' PPAF", qty2g: 85, price2g: "$5.75", sizeNote2g: "6\" cups", description: "medium, some bnb" },
  { name: "Delosperma 'Ocean Sunset Violet' PPAF", qty2g: 26, price2g: "$5.75", sizeNote2g: "6\" cups", description: "medium" },
  { name: "Dianella revoluta 'Little Rev' PP17,719", qty1g: 75, price1g: "$7.50", description: "medium-full" },
  { name: "Dianella tasmanica 'Destiny' PP19,338", qty1g: 40, price1g: "$7.50", description: "small-medium, variegated" },
  { name: "Dianella tasmanica 'Destiny' PP19,338", qty5g: 7, price5g: "$23.95", description: "small-medium" },
  { name: "Dianella tasmanica 'Wyeena' PP22,196", qty1g: 75, price1g: "$7.50", description: "*medium, bright variegated" },
  { name: "Dichroa febrifuga", qty1g: 25, price1g: "$6.50", description: "medium, buds" },
  { name: "Dichroa febrifuga", qty5g: 3, price5g: "$19.95", description: "*full, buds/blm" },
  { name: "Doodia media", qty1g: 88, price1g: "$7.25", description: "medium-full, red new growth" },
  { name: "Dyckia 'Morris Hobbs'", qty1g: 25, price1g: "$8.95", description: "full" },
  { name: "Echeveria agavoides", qty2g: 27, price2g: "$5.95", sizeNote2g: "6\" cups", description: "small-medium" },
  { name: "Echeveria 'Pulv-oliver'", qty2g: 40, price2g: "$5.50", sizeNote2g: "6\" cups", description: "*medium, bnb" },
  { name: "Elegia capensis 'Ginny's Giant'", qty5g: 162, price5g: "$24.95", description: "**Prime, showy, large!!" },
  { name: "Elegia capensis 'Ginny's Giant'", qty2g: 67, price2g: "$65.00", sizeNote2g: "15g", description: "*Prime, showy white bracts" },
  { name: "Elegia thyrsoidea", qty5g: 3, price5g: "$23.95", description: "full, grey/green, upright" },
  { name: "Eremophila racemosa (Easter Egg Bush)", qty5g: 10, price5g: "$23.95", description: "medium-full, some bnb" },
  { name: "Eucalyptus 'Moon Lagoon'", qty5g: 5, price5g: "$24.95", description: "medium-full" },
  { name: "Fascicularia pitcairnifolia", qty5g: 23, price5g: "$22.95", description: "*full, shade bromeliad" },
  { name: "Faucaria sp.", qty2g: 45, price2g: "$6.25", sizeNote2g: "6\" cups", description: "medium-full, Tiger Jaws" },
  { name: "Festuca glauca 'Beyond Blue' PP23,307", qty1g: 232, price1g: "$6.15", description: "*full" },
  { name: "Festuca glauca 'Boulder Blue'", qty1g: 202, price1g: "$5.95", description: "*full" },
  { name: "Furcraea foetida", qty1g: 130, price1g: "$4.95", description: "*full, bright green, tough" },
  { name: "Gasteria 'Little Warty'", qty1g: 90, price1g: "$8.95", description: "*medium-full" },
  { name: "Grevillea 'Austraflora Fanfare'", qty5g: 7, price5g: "$24.95", description: "*medium-full, buds/blm" },
  { name: "Grevillea 'King's Celebration' PP#27,899", qty1g: 100, price1g: "$9.95", description: "small" },
  { name: "Grevillea 'King's Fire' PP#27,875", qty1g: 100, price1g: "$9.95", description: "small-medium" },
  { name: "Grevillea 'King's Rainbow' PP#27,931", qty1g: 100, price1g: "$9.95", description: "small-medium, some color" },
  { name: "Grevillea lanigera 'Mt Tamboritha'", qty5g: 21, price5g: "$20.95", description: "medium-full, buds" },
  { name: "Grevillea 'Red Hooks'", qty5g: 27, price5g: "$25.95", description: "*medium-full, buds/blm" },
  { name: "Hakonechloa macra 'All Gold'", qty1g: 10, price1g: "$7.50", description: "small-medium" },
  { name: "Halimiocistus wintonensis", qty5g: 15, price5g: "$18.95", description: "medium" },
  { name: "Halimiocistus wintonensis 'Merrist Wood Cream'", qty5g: 12, price5g: "$18.95", description: "medium" },
  { name: "Heuchera 'Lime Marmalade' PP21,861", qty1g: 5, price1g: "$7.50", description: "medium, nice color" },
  { name: "Ischyrolepis subverticillata", qty2g: 5, price2g: "$65.00", sizeNote2g: "15g", description: "full, nice foliage" },
  { name: "Kalanchoe beharensis 'Fang'", qty1g: 3, price1g: "$7.95", description: "medium, unusual" },
  { name: "Kalanchoe marmorata", qty1g: 5, price1g: "$7.25", description: "medium, spotted big leaves" },
  { name: "Kalanchoe marnieriana", qty2g: 10, price2g: "$5.95", sizeNote2g: "6\" cups", description: "*medium-full, unique foliage" },
  { name: "Kalanchoe orgyalis", qty1g: 10, price1g: "$6.95", description: "medium-full, copper lvs." },
  { name: "Kalanchoe sexangularis", qty2g: 3, price2g: "$19.95", description: "medium-full" },
  { name: "Kalanchoe tomentosa", qty2g: 25, price2g: "$5.75", sizeNote2g: "6\" cups", description: "medium" },
  { name: "Kalanchoe tomentosa 'Chocolate Soldier'", qty2g: 45, price2g: "$5.75", sizeNote2g: "6\" cups", description: "medium-full, fuzzy brown" },
  { name: "Kalanchoe tomentosa 'Chocolate Soldier'", qty1g: 5, price1g: "$6.95", description: "medium-full, some buds" },
  { name: "Leucadendron 'Cloudbank Ginny'", qty5g: 57, price5g: "$25.95", description: "*medium-full" },
  { name: "Leucadendron 'Duet'", qty5g: 30, price5g: "$25.95", description: "medium" },
  { name: "Leucadendron 'Ebony' PP 23,258", qty5g: 25, price5g: "$32.95", description: "medium" },
  { name: "Leucadendron 'Inca Gold'", qty5g: 10, price5g: "$25.95", description: "medium" },
  { name: "Leucadendron 'Maui Sunset'", qty1g: 5, price1g: "$9.50", description: "medium" },
  { name: "Leucadendron 'Maui Sunset'", qty5g: 93, price5g: "$25.95", description: "medium-full" },
  { name: "Leucadendron 'Pisa'", qty5g: 1, price5g: "$25.95", description: "full" },
  { name: "Leucadendron 'Red Gem'", qty5g: 25, price5g: "$25.95", description: "medium-full" },
  { name: "Leucadendron 'Safari Goldstrike'", qty5g: 80, price5g: "$25.95", description: "*full" },
  { name: "Leucadendron 'Safari Sunset'", qty5g: 3, price5g: "$25.95", description: "full" },
  { name: "Leucadendron 'Safari Sunset'", qty2g: 2, price2g: "$59.95", sizeNote2g: "7g", description: "*full, color" },
  { name: "Leucadendron salignum 'Blush'", qty5g: 63, price5g: "$25.95", description: "*medium-full, RED" },
  { name: "Leucadendron salignum 'Candles' NEW2023 CHN Intro", qty5g: 1, price5g: "$25.95", description: "medium" },
  { name: "Leucadendron salignum 'Golden Tip'", qty5g: 39, price5g: "$25.95", description: "medium-full" },
  { name: "Leucadendron salignum 'Summer Red'", qty5g: 35, price5g: "$25.95", description: "*full, nice color" },
  { name: "Leucadendron salignum 'Winter Red'", qty5g: 15, price5g: "$25.95", description: "medium-full" },
  { name: "Leucadendron 'Silvan Red'", qty5g: 2, price5g: "$25.95", description: "medium-full, color" },
  { name: "Leucadendron 'Yaeli'", qty5g: 51, price5g: "$25.95", description: "*medium-full, nice color" },
  { name: "Leucadendron 'Wilson's Wonder'", qty5g: 44, price5g: "$25.95", description: "*medium-full, nice color" },
  { name: "Leucospermum cordifolium 'Vlam' (Flame Giant)", qty5g: 1, price5g: "$34.95", description: "medium" },
  { name: "Leucospermum cuneiforme", qty5g: 2, price5g: "$34.95", description: "medium" },
  { name: "Leucospermum 'High Gold'", qty5g: 5, price5g: "$34.95", description: "medium" },
  { name: "Leucospermum 'Sunrise'", qty5g: 47, price5g: "$34.95", description: "medium" },
  { name: "Leucospermum 'Veldfire'", qty5g: 2, price5g: "$34.95", description: "small" },
  { name: "Lomandra confertifolia ‘Del Sol’", qty1g: 223, price1g: "$8.95", description: "*full" },
  { name: "Lomandra confertifolia 'Pacific Sky' PP32,991", qty1g: 74, price1g: "$8.95", description: "medium-full, some bnb" },
  { name: "Lomandra confertifolia ‘Shorty’ PP32,554", qty1g: 225, price1g: "$8.95", description: "*medium, dwarf" },
  { name: "Lomandra longifolia 'Arctic Frost' PP33,431", qty1g: 332, price1g: "$8.95", description: "*medium-full, variegated" },
  { name: "Lomandra longifolia 'Miner's Gold'PP33,984", qty1g: 175, price1g: "$8.95", description: "*medium-full, bright yellow" },
  { name: "Lomandra longifolia 'Miner's Gold'PP33,984", qty5g: 32, price5g: "$22.95", description: "medium, nice color" },
  { name: "Lomandra 'Platinum Beauty' PP25,962", qty1g: 15, price1g: "$8.95", description: "*medium-full" },
  { name: "Lomandra 'Platinum Beauty' PP25,962", qty2g: 57, price2g: "$19.95", description: "medium" },
  { name: "Lomandra 'Platinum Beauty' PP25,962", qty5g: 226, price5g: "$24.95", description: "*medium, some bnb" },
  { name: "Lomandra 'White Sands' PP25,962", qty1g: 400, price1g: "$8.95", description: "medium" },
  { name: "Maireana sedifolia", qty2g: 5, price2g: "$49.95", sizeNote2g: "15g", description: "small-medium" },
  { name: "Manfreda undulata 'Chocolate Chips'", qty1g: 94, price1g: "$9.95", description: "medium, showy!" },
  { name: "Manfreda undulata 'Cherry Chocolate Chip' PP29,918", qty1g: 202, price1g: "$9.95", description: "medium, deeply spotted" },
  { name: "Manfreda undulata 'Cherry Chocolate Chip' PP29,918", qty2g: 6, price2g: "$20.95", description: "full, spotted" },
  { name: "Manfreda undulata 'Cherry Chocolate Chip' PP29,918", qty5g: 19, price5g: "$24.95", description: "full" },
  { name: "Mangave 'Aztec King' PP32,151", qty1g: 70, price1g: "$9.95", description: "medium, big variety 3-4'" },
  { name: "Mangave 'Aztec King' PP32,151", qty2g: 3, price2g: "$20.95", description: "*full" },
  { name: "Mangave 'Desert Dragon' PP31,311", qty1g: 335, price1g: "$7.95", description: "**prime, compact, spotted" },
  { name: "Mangave 'Desert Dragon' PP31,311", qty2g: 25, price2g: "$20.95", description: "*medium-full" },
  { name: "Mangave 'Falling Waters' PP30,650", qty1g: 42, price1g: "$7.95", description: "*full, spilling foliage" },
  { name: "Mangave 'Mission to Mars' PP29,393", qty1g: 168, price1g: "$9.95", description: "medium" },
  { name: "Mangave 'Mission to Mars' PP29,393", qty2g: 33, price2g: "$20.95", description: "*full, dark red, BIG" },
  { name: "Mangave 'Navajo Princess' PP31,136", qty1g: 77, price1g: "$9.95", description: "medium-full" },
  { name: "Mangave 'Pineapple Express' PP28,613", qty1g: 25, price1g: "$7.95", description: "*medium-full" },
  { name: "Mangave 'Pineapple Express' PP28,613", qty2g: 20, price2g: "$20.95", description: "medium" },
  { name: "Mangave 'Pineapple Punch' PP32,014", qty1g: 212, price1g: "$9.95", description: "medium, variegated" },
  { name: "Mangave 'Pineapple Punch' PP32,014", qty2g: 75, price2g: "$20.95", description: "*medium, bright" },
  { name: "Mangave 'Praying Hands' PP34,508", qty1g: 89, price1g: "$14.95", description: "small" },
  { name: "Mangave 'Praying Hands' PP34,508", qty2g: 29, price2g: "$29.95", description: "*medium-full" },
  { name: "Mangave 'Praying Hands' PP34,508", qty5g: 50, price5g: "$34.95", description: "medium" },
  { name: "Mangave 'Silver Fox' PP29,6742", qty1g: 65, price1g: "$7.95", description: "*medium-full" },
  { name: "Mangave 'Silver Fox' PP29,6742", qty2g: 25, price2g: "$20.95", description: "medium" },
  { name: "Mangave 'Snow Leopard' PP31,137", qty1g: 15, price1g: "$9.95", description: "*full, bright" },
  { name: "Mangave 'Snow Leopard' PP31,137", qty2g: 102, price2g: "$20.95", description: "**prime, variegated" },
  { name: "Mangave 'Tooth Fairy' PP29,599", qty1g: 42, price1g: "$7.95", description: "medium" },
  { name: "Mangave 'Tooth Fairy' PP29,599", qty2g: 25, price2g: "$20.95", description: "medium" },
  { name: "Oscularia deltoides (Lampranthus deltoides)", qty2g: 20, price2g: "$5.25", sizeNote2g: "6\" cups", description: "medium" },
  { name: "Ozothamnus diosmifolius 'Dark Pink'", qty1g: 20, price1g: "$6.50", description: "medium, buds/blm" },
  { name: "Pellaea rotundifolia (Button Fern)", qty1g: 38, price1g: "$7.25", description: "medium-full" },
  { name: "Philotheca myoporoides 'Profusion'", qty5g: 15, price5g: "$21.95", description: "*medium, buds/blm" },
  { name: "Phlebodium aureum (Blue Star Fern)", qty1g: 64, price1g: "$7.50", description: "medium, blue/green" },
  { name: "Phlebodium aureum (Blue Star Fern)", qty2g: 4, price2g: "$19.95", description: "medium-full" },
  { name: "Phlebodium aureum 'Mandaianum' (Blue Star Fern)", qty1g: 106, price1g: "$7.25", description: "*medium, large blue lvs" },
  { name: "Phlebosia 'Nicolas Diamond' PP30,873", qty1g: 43, price1g: "$7.25", description: "medium, different foilage" },
  { name: "Phormium 'Guardsman'", qty5g: 12, price5g: "$26.95", description: "medium" },
  { name: "Polystichum munitum", qty1g: 503, price1g: "$7.25", description: "*medium-full" },
  { name: "Polystichum tsus-simense", qty1g: 56, price1g: "$7.25", description: "medium" },
  { name: "Primula vialii", qty1g: 35, price1g: "$6.25", description: "medium" },
  { name: "Prostanthera ovalifolia 'Variegata'", qty1g: 86, price1g: "$6.50", description: "*full, scented" },
  { name: "Protea cynaroides", qty5g: 10, price5g: "$36.95", description: "medium" },
  { name: "Protea 'Pink Ice'", qty5g: 10, price5g: "$34.95", description: "medium" },
  { name: "Protea 'Red Ice' (P.'Lancelot)", qty5g: 10, price5g: "$36.95", description: "small" },
  { name: "Protea 'Red Ice' (P.'Lancelot)", qty2g: 2, price2g: "$75.00", sizeNote2g: "7g", description: "medium-full" },
  { name: "Protea repens (Red)", qty5g: 7, price5g: "$34.95", description: "medium" },
  { name: "Pteris cretica 'Mayii'", qty1g: 81, price1g: "$7.50", description: "*full, great foliage, variegated" },
  { name: "Pteris ensiformis 'Evergemiensis'", qty1g: 65, price1g: "$7.50", description: "medium, variegated" },
  { name: "Raoulia australis", qty1g: 45, price1g: "$5.95", description: "full, tight silver mat" },
  { name: "Restio gossypinus", qty1g: 5, price1g: "$8.50", description: "medium, Dwarf Restio!!" },
  { name: "Rhodocoma capensis", qty5g: 13, price5g: "$23.95", description: "*full, Restio, great texture" },
  { name: "Romneya coulteri", qty1g: 275, price1g: "$7.95", description: "medium-full" },
  { name: "Ruschia lineolata 'Nana'", qty1g: 31, price1g: "$6.95", description: "full" },
  { name: "Scleranthus biflorus", qty1g: 75, price1g: "$6.95", description: "full" },
  { name: "Sedum makinoi 'Ogon'", qty2g: 65, price2g: "$5.50", sizeNote2g: "6\" cups", description: "full" },
  { name: "Sempervivum atlanticum", qty2g: 71, price2g: "$5.25", sizeNote2g: "6\" cups", description: "full, FAST" },
  { name: "Sempervivum 'Jade Rose'", qty2g: 56, price2g: "$5.25", sizeNote2g: "6\" cups", description: "full, fuzzy red" },
  { name: "Sempervivum 'Red Heart'", qty2g: 116, price2g: "$5.25", sizeNote2g: "6\" cups", description: "*full, red" },
  { name: "Sempervivum sp. Red", qty2g: 116, price2g: "$5.25", sizeNote2g: "6\" cups", description: "**full, dark red" },
  { name: "Sempervivum tectorum 'Greenii'", qty2g: 35, price2g: "$5.25", sizeNote2g: "6\" cups", description: "*full, mini form" },
  { name: "Senecio crassissimus", qty2g: 5, price2g: "$5.95", sizeNote2g: "6\" cups", description: "medium" },
  { name: "Senecio crassissimus", qty1g: 90, price1g: "$6.70", description: "medium" },
  { name: "Stromanthe sanguinea", qty1g: 25, price1g: "$6.95", description: "small-medium" },
  { name: "Tricyrtis 'Empress'", qty1g: 95, price1g: "$6.25", description: "medium, some buds" },
  { name: "Woodwardia fimbriata", qty1g: 157, price1g: "$7.50", description: "*medium" },
  { name: "Yucca aloifolia 'Magenta Magic'", qty1g: 180, price1g: "$8.95", description: "*full, dark purple" },
  { name: "Yucca aloifolia 'Magenta Magic'", qty5g: 200, price5g: "$24.95", description: "**medium, dark purple" },
  { name: "Yucca desmetiana 'Blue Boy'", qty5g: 104, price5g: "$24.95", description: "*medium, PURPLE" },
  { name: "Yucca rostrata 'Sapphire Skies'", qty1g: 90, price1g: "$8.95", description: "small" }
];

export const AvailabilityList: React.FC<{ 
  onBack: () => void;
  isPriced?: boolean;
  companyName?: string;
  onSignOut?: () => void;
  onRequestPriced?: () => void;
}> = ({ onBack, isPriced = false, companyName, onSignOut, onRequestPriced }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sizeFilter, setSizeFilter] = useState<'all' | '1g' | '2g' | '5g'>('all');

  const filteredData = useMemo(() => {
    return AVAILABILITY_DATA.filter(item => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.sizeNote2g && item.sizeNote2g.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.sizeNote5g && item.sizeNote5g.toLowerCase().includes(searchTerm.toLowerCase()));

      if (!matchesSearch) return false;

      if (sizeFilter === '1g') return !!(item.price1g || item.qty1g);
      if (sizeFilter === '2g') return !!(item.price2g || item.qty2g);
      if (sizeFilter === '5g') return !!(item.price5g || item.qty5g);

      return true;
    });
  }, [searchTerm, sizeFilter]);

  return (
    <div className="bg-[#fcfbf9] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Navigation / Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-stone-200 pb-6">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <button 
                onClick={onBack}
                className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-crescent-green font-medium transition-colors group cursor-pointer"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </button>

              {isPriced && companyName && (
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-semibold text-emerald-800">
                  <ShieldCheck size={14} className="text-emerald-600" />
                  <span>Trade Access: <strong>{companyName}</strong></span>
                  {onSignOut && (
                    <button 
                      onClick={onSignOut}
                      className="ml-1 text-emerald-600 hover:text-red-600 font-bold underline cursor-pointer"
                      title="Sign out of trade session"
                    >
                      (Sign Out)
                    </button>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <span className="bg-[#2a4521] text-amber-300 text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                {isPriced ? 'Wholesale & Trade Only' : 'Nursery Stock & Availability'}
              </span>
              <span className="text-xs text-stone-500 font-medium">Updated Weekly</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mt-2">
              {isPriced ? 'Priced Availability List' : 'Availability List'}
            </h1>
            <p className="text-stone-600 text-sm sm:text-base mt-1 max-w-2xl">
              {isPriced 
                ? 'Live inventory with container quantities, trade pricing, spec notes, and plant conditions.' 
                : 'Current availability of plants in production, container sizes, and growing conditions.'}
            </p>
          </div>

          {/* Search, Size Filter & Print Action */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            {/* Filter Tabs */}
            <div className="inline-flex p-1 bg-stone-100 rounded-xl border border-stone-200 text-xs font-semibold">
              <button
                onClick={() => setSizeFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${sizeFilter === 'all' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'}`}
              >
                All Sizes ({AVAILABILITY_DATA.length})
              </button>
              <button
                onClick={() => setSizeFilter('1g')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${sizeFilter === '1g' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'}`}
              >
                1 Gal
              </button>
              <button
                onClick={() => setSizeFilter('2g')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${sizeFilter === '2g' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'}`}
              >
                2 Gal / Cups
              </button>
              <button
                onClick={() => setSizeFilter('5g')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${sizeFilter === '5g' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'}`}
              >
                5 Gal / 15g
              </button>
            </div>

            {/* Search Input */}
            <div className="relative flex-grow sm:w-64">
              <input
                type="text"
                placeholder="Search plant or condition..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#2a4521]/20 focus:border-[#2a4521] outline-none text-sm transition-all shadow-xs"
              />
              <Search className="absolute left-3 top-2.5 text-stone-400" size={16} />
            </div>

            {/* Print Button */}
            <button 
              onClick={() => window.print()}
              className="p-2.5 bg-white border border-stone-300 rounded-xl text-stone-600 hover:bg-stone-50 transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              title={isPriced ? "Print Price Sheet" : "Print Availability List"}
            >
              <Printer size={18} />
              <span className="sm:hidden text-xs font-semibold">Print</span>
            </button>
          </div>
        </div>

        {/* Banner Section */}
        {isPriced ? (
          <div className="bg-emerald-900 text-white rounded-2xl p-5 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md">
            <div className="flex items-center gap-4">
              <div className="bg-emerald-800/80 p-3 rounded-xl border border-emerald-700/50 shrink-0">
                <PackageCheck size={24} className="text-amber-300" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-white">Wholesale & Trade Direct Ordering</h3>
                <p className="text-emerald-200 text-xs sm:text-sm mt-0.5">
                  Quantity in stock is shown per container tier. Call <strong>(831) 246-1128</strong> to place will-call orders or arrange delivery.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium bg-emerald-950/60 px-3.5 py-2 rounded-xl border border-emerald-800 shrink-0">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span>{filteredData.length} items shown</span>
            </div>
          </div>
        ) : (
          <div className="bg-[#2a4521] text-white rounded-2xl p-5 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md">
            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-3 rounded-xl border border-white/15 shrink-0">
                <PackageCheck size={24} className="text-amber-300" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-white">Production & Garden Availability</h3>
                <p className="text-emerald-100 text-xs sm:text-sm mt-0.5">
                  Showing available container sizes and crop notes. For questions or custom plant sourcing, call <strong>(831) 246-1128</strong>.
                </p>
              </div>
            </div>
            {onRequestPriced && (
              <button
                onClick={onRequestPriced}
                className="bg-white hover:bg-amber-50 text-[#2a4521] font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <Lock size={14} className="text-[#cb6228]" />
                <span>Sign In for Trade Prices</span>
              </button>
            )}
          </div>
        )}

        {/* Data Table */}
        <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                <th className="px-5 py-4 w-5/12 min-w-[240px]">Scientific / Plant Name</th>
                <th className="px-4 py-4 w-2/12 text-center min-w-[120px]">1 Gallon</th>
                <th className="px-4 py-4 w-2/12 text-center min-w-[130px]">2 Gal / Spec.</th>
                <th className="px-4 py-4 w-2/12 text-center min-w-[130px]">5 Gal / Spec.</th>
                <th className="px-5 py-4 w-3/12 min-w-[200px]">Condition & Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredData.map((item, idx) => (
                <tr 
                  key={idx} 
                  className="hover:bg-amber-50/40 transition-colors group text-sm"
                >
                  {/* Scientific Name */}
                  <td className="px-5 py-3.5 font-bold text-stone-900 font-serif text-base group-hover:text-crescent-green transition-colors">
                    {item.name}
                  </td>

                  {/* 1 Gallon Column */}
                  <td className="px-4 py-3.5 text-center">
                    {isPriced ? (
                      item.price1g ? (
                        <div className="inline-flex flex-col items-center">
                          <span className="font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md text-xs border border-emerald-100 font-mono">
                            {item.price1g}
                          </span>
                          {item.qty1g !== undefined && (
                            <span className="text-[11px] text-stone-500 mt-0.5 font-medium">
                              {item.qty1g} in stock
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-stone-300 font-light">—</span>
                      )
                    ) : (
                      item.price1g || item.qty1g ? (
                        <span className="inline-block bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold px-2.5 py-1 rounded-md">
                          Available
                        </span>
                      ) : (
                        <span className="text-stone-300 font-light">—</span>
                      )
                    )}
                  </td>

                  {/* 2 Gallon Column */}
                  <td className="px-4 py-3.5 text-center">
                    {isPriced ? (
                      item.price2g ? (
                        <div className="inline-flex flex-col items-center">
                          <span className="font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md text-xs border border-emerald-100 font-mono">
                            {item.price2g}
                          </span>
                          <div className="flex items-center gap-1 mt-0.5">
                            {item.qty2g !== undefined && (
                              <span className="text-[11px] text-stone-500 font-medium">
                                {item.qty2g} in stock
                              </span>
                            )}
                            {item.sizeNote2g && (
                              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1 rounded border border-amber-200">
                                {item.sizeNote2g}
                              </span>
                            )}
                          </div>
                        </div>
                      ) : (
                        <span className="text-stone-300 font-light">—</span>
                      )
                    ) : (
                      item.price2g || item.qty2g ? (
                        <div className="inline-flex flex-col items-center gap-1">
                          <span className="inline-block bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold px-2.5 py-1 rounded-md">
                            Available
                          </span>
                          {item.sizeNote2g && (
                            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                              {item.sizeNote2g}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-stone-300 font-light">—</span>
                      )
                    )}
                  </td>

                  {/* 5 Gallon Column */}
                  <td className="px-4 py-3.5 text-center">
                    {isPriced ? (
                      item.price5g ? (
                        <div className="inline-flex flex-col items-center">
                          <span className="font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md text-xs border border-emerald-100 font-mono">
                            {item.price5g}
                          </span>
                          <div className="flex items-center gap-1 mt-0.5">
                            {item.qty5g !== undefined && (
                              <span className="text-[11px] text-stone-500 font-medium">
                                {item.qty5g} in stock
                              </span>
                            )}
                            {item.sizeNote5g && (
                              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1 rounded border border-amber-200">
                                {item.sizeNote5g}
                              </span>
                            )}
                          </div>
                        </div>
                      ) : (
                        <span className="text-stone-300 font-light">—</span>
                      )
                    ) : (
                      item.price5g || item.qty5g ? (
                        <div className="inline-flex flex-col items-center gap-1">
                          <span className="inline-block bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold px-2.5 py-1 rounded-md">
                            Available
                          </span>
                          {item.sizeNote5g && (
                            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                              {item.sizeNote5g}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-stone-300 font-light">—</span>
                      )
                    )}
                  </td>

                  {/* Condition / Description */}
                  <td className="px-5 py-3.5">
                    <span className="text-xs text-stone-600 font-medium leading-snug inline-block">
                      {item.description}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center text-stone-400 italic">
                    No plants found matching "{searchTerm}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom Legend & Contact */}
        <div className="mt-8 bg-stone-100 border border-stone-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-600">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-bold text-stone-800 uppercase tracking-wider">Condition Key:</span>
            <span className="bg-white px-2 py-1 rounded border border-stone-200"><strong>*</strong> Prime / Top Quality</span>
            <span className="bg-white px-2 py-1 rounded border border-stone-200"><strong>bnb</strong> Buds & Blooms</span>
            <span className="bg-white px-2 py-1 rounded border border-stone-200"><strong>stk.</strong> Staked</span>
            <span className="bg-white px-2 py-1 rounded border border-stone-200"><strong>6" cups / 7g / 15g</strong> Specialty pot sizes</span>
          </div>
          <div className="text-stone-500 text-center md:text-right font-medium">
            Orders & Holds: (831) 246-1128 • info@crescenthillnursery.com
          </div>
        </div>

        {/* Print / Footer info */}
        <div className="mt-10 text-center text-stone-400 text-xs flex flex-col items-center gap-3">
          <p className="max-w-md">Crescent Hill Nursery Inc. • Watsonville, CA • Ph. 831-246-1128 • www.crescenthillnursery.com</p>
          <div className="h-px w-24 bg-stone-200"></div>
          <p className="uppercase tracking-widest font-bold">Specializing in Mediterranean, Native & Drought Tolerant Flora</p>
        </div>
      </div>
    </div>
  );
};
