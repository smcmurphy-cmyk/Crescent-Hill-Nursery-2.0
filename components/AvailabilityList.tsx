import React, { useState } from 'react';
import { AvailabilityItem } from '../types';
import { Search, Printer, Calendar, ArrowLeft, Download } from 'lucide-react';

const AVAILABILITY_DATA: AvailabilityItem[] = [
  { name: "Abutilon 'Crouching Tiger' stk.", price1g: "$6.75", price2g: "$17.75", condition: "*medium-full, buds/blm" },
  { name: "Abutilon 'Dame Vanessa' stk.", price1g: "$6.75", price2g: "$17.75", condition: "medium-full, buds/blm" },
  { name: "Abutilon 'Frieda' stk.", price1g: "$6.75", price2g: "$17.75", condition: "*medium-full, buds/blm" },
  { name: "Abutilon 'Kristen's Pink' stk.", price1g: "$6.75", condition: "*medium-full, buds/blm" },
  { name: "Abutilon megapotamicum stk.", price1g: "$6.75", price2g: "$17.75", condition: "*medium-full, buds/blm" },
  { name: "Abutilon megapotamicum 'Paisley' stk.", price1g: "$7.25", price2g: "$18.50", condition: "*full, variegated, blm" },
  { name: "Abutilon 'Nabob' stk.", price1g: "$6.75", condition: "medium-full, buds, some blm" },
  { name: "Abutilon pictum 'Mardi Gras' stk.", price1g: "$6.75", price2g: "$17.75", condition: "*full, buds/blm" },
  { name: "Abutilon pictum 'Thompsonii' stk.", price1g: "$6.75", condition: "*medium-full, buds/blm" },
  { name: "Abutilon 'Red Dragon' NEW 2022 CHN Intro", price1g: "$6.75", price2g: "$17.75", condition: "*full, buds/blm" },
  { name: "Abutilon 'Rip Van Periwinkle' NEW 2023 CHN Intro", price1g: "$6.75", price2g: "$17.75", condition: "*medium-full, buds/blm" },
  { name: "Abutilon 'Souvenir de Bonn' stk.", price1g: "$7.25", price2g: "$18.50", condition: "*medium-full, variegated, blm" },
  { name: "Abutilon 'Strawberry Ice' NEW 2023 CHN Intro", price1g: "$6.75", condition: "*medium-full, buds/blm" },
  { name: "Abutilon 'Tiger Eye' stk.", price1g: "$6.75", price2g: "$17.75", condition: "*full, buds/blm" },
  { name: "Abutilon 'Savitzii' stk.", price1g: "$6.75", condition: "medium, bright" },
  { name: "Abutilon 'Victor Reiter' stk.", price2g: "$17.75", condition: "medium-full, buds/blm" },
  { name: "Abutilon 'Voodoo' stk.", price1g: "$6.75", condition: "medium-full, buds/blm" },
  { name: "Acacia cognata 'Cousin Itt' PPAF", price1g: "$9.95", price2g: "$24.95", price5g: "$59.95 (15g)", condition: "medium" },
  { name: "Acacia c. 'Purple Rain' NEW 2023 CHN Intro", price5g: "$29.95", condition: "*full, nice foliage" },
  { name: "Acacia c. 'Wavy Gravy' NEW 2023 CHN Intro", price1g: "$10.95", price5g: "$29.95", condition: "medium, nice foliage" },
  { name: "Acacia covenyi stk. (Blue Bush)", price1g: "$9.95", price2g: "$24.95", condition: "medium" },
  { name: "Acacia vestita stk. (Hairy Wattle)", price5g: "$22.95", condition: "medium" },
  { name: "Achillea sibirica 'Love Parade'", price1g: "$5.95", condition: "full, buds" },
  { name: "Adenanthos sericeus (Coastal Woollybush)", price1g: "$9.95", price5g: "$26.95", condition: "*full, soft silver" },
  { name: "Adenanthos 'Silver Haze' (Woollybush)", price1g: "$10.45", price5g: "$28.95", condition: "*full, bright silver" },
  { name: "Aeonium arboreum", price1g: "$6.95", price2g: "$14.95", condition: "*full, clean" },
  { name: "Aeonium arboreum 'Zwartkop'", price1g: "$7.45", price2g: "$16.50", condition: "*full, deep purple" },
  { name: "Aeonium simsii", price1g: "$6.95", condition: "full, some buds" },
  { name: "Agastache aurantiaca (Orange Hummingbird Mint)", price1g: "$5.95", condition: "medium-full, blm" },
  { name: "Agastache cana 'Double Bubble Mint'", price1g: "$5.95", condition: "full, fragrant, blm" },
  { name: "Agastache mexicana 'Red Fortune'", price1g: "$5.95", condition: "full, buds/blm" },
  { name: "Agastache 'Pstessene' (Coronado Red Hyssop)", price1g: "$5.95", condition: "medium-full, blm" },
  { name: "Agastache rupestris 'Sunset Hyssop'", price1g: "$5.95", condition: "full, fragrant" },
  { name: "Agastache 'Black Adder'", price1g: "$6.45", condition: "full, dark buds/blm" },
  { name: "Agave attenuata (Fox Tail Agave)", price1g: "$7.95", price5g: "$20.95", condition: "*full" },
  { name: "Agave attenuata 'Ray of Light' PP21,854", price1g: "$10.45", condition: "*prime, big" },
  { name: "Agave 'Blue Flame'", price1g: "$8.25", price2g: "$5.95 (6\")", condition: "*medium-full" },
  { name: "Agave 'Blue Glow'", price1g: "$10.45", price2g: "$6.25 (6\")", condition: "*medium-full" },
  { name: "Agave 'Snow Glow' variegated NEW 2025", price1g: "$14.95", price2g: "$24.95", condition: "*medium-full, bright" },
  { name: "Agave vilmoriniana (Octopus Agave)", price1g: "$9.95", price5g: "$26.95", condition: "*full, graceful" },
  { name: "Ajuga reptans (Carpet Bugle)", price1g: "$4.95", condition: "full flats/pots" },
  { name: "Ajuga 'Sparkler'", price1g: "$5.45", condition: "full, variegated" },
  { name: "Alocasia gageana 'California Shield'", price1g: "$12.95", price2g: "$24.95", condition: "lush, large leaves" },
  { name: "Anemanthele lessoniana (NZ Wind Grass)", price1g: "$6.25", condition: "full, graceful" },
  { name: "Anigozanthos 'Bush Dawn'", price5g: "$19.95", condition: "medium-full" },
  { name: "Anigozanthos 'Bush Nugget'", price1g: "$8.95", condition: "medium-full, buds" },
  { name: "Anigozanthos 'Cape Mini Magenta'", price1g: "$9.45", condition: "*full, buds/blm" },
  { name: "Anigozanthos 'Dwarf Pink'", price1g: "$8.95", condition: "medium-full, buds/blm" },
  { name: "Anigozanthos flavidus (Kangaroo Paws)", price1g: "$8.95", price5g: "$19.95", condition: "full, robust" },
  { name: "Anigozanthos 'Kanga Burgundy'", price1g: "$8.95", price5g: "$19.95", condition: "**full, buds/blm" },
  { name: "Anigozanthos 'Kanga Orange'", price1g: "$8.95", condition: "full, buds/blm" },
  { name: "Anigozanthos 'Kanga Pink'", price1g: "$8.95", condition: "full, buds/blm" },
  { name: "Anigozanthos 'Kanga Red'", price1g: "$8.95", condition: "full, buds/blm" },
  { name: "Anigozanthos 'Kanga Yellow'", price1g: "$8.95", condition: "full, buds/blm" },
  { name: "Anigozanthos 'Phar Lap'", price1g: "$9.45", condition: "medium-full, buds" },
  { name: "Anigozanthos 'Royal Cheer'", price1g: "$9.45", condition: "full, bicolored buds" },
  { name: "Anigozanthos 'Amber Velvet'", price1g: "$9.95", price5g: "$21.95", condition: "*full, buds/blm" },
  { name: "Anigozanthos 'Gold Velvet'", price1g: "$9.95", price5g: "$21.95", condition: "*full, buds/blm" },
  { name: "Anisodontea 'Tara's Pink'", price1g: "$7.25", price5g: "$19.95", condition: "full, blooming" },
  { name: "Asarina sp. (Twining Snapdragon)", price1g: "$5.95", condition: "trailing, buds" },
  { name: "Asarina x wislizensis 'Red Dragon'", price1g: "$6.45", condition: "full trellis, blm" },
  { name: "Asclepias curassavica 'Wildfire'", price1g: "$5.95", condition: "full, buds/blm" },
  { name: "Asclepias tuberosa (Butterfly Flower)", price1g: "$5.95", condition: "full, dormant/sprouting" },
  { name: "Aster lateriflorus 'Lady in Black'", price1g: "$6.25", condition: "full, dark foliage" },
  { name: "Astilbe arendsii 'Deutschland'", price1g: "$6.95", condition: "full, lush" },
  { name: "Astilbe arendsii 'Fanal'", price1g: "$6.95", condition: "full, bronze leaves" },
  { name: "Astilbe arendsii 'Granaat'", price1g: "$6.95", condition: "full, lush" },
  { name: "Astilbe arendsii 'Showstar Mix'", price1g: "$6.45", condition: "compact, full" },
  { name: "Astilbe chinensis 'Pumila'", price1g: "$6.45", condition: "dense, clean" },
  { name: "Astilbe 'Visions'", price1g: "$6.95", condition: "full, buds" },
  { name: "Athyrium 'Godzilla' (Japanese Painted Fern)", price1g: "$7.95", condition: "*full, silvery foliage" },
  { name: "Athyrium nipponicum 'Red Beauty'", price1g: "$7.95", condition: "*full, red veins" },
  { name: "Athyrium nipponicum v. pictum", price1g: "$7.45", condition: "*full, colorful" },
  { name: "Arctostaphylos manzanita 'Dr. Hurd'", price1g: "$7.95", condition: "small" },
  { name: "Asplenium antiquum 'Victoria'", price1g: "$7.25", condition: "full, great foliage" },
  { name: "Banksia blechnifolia", price1g: "$12.95", price5g: "$34.95", condition: "*full groundcover, healthy" },
  { name: "Banksia marginata (Silver Banksia)", price1g: "$14.95", price5g: "$38.95", condition: "medium, nice silver" },
  { name: "Banksia nivea (Honeypot Dryandra)", price1g: "$13.95", price5g: "$36.95", condition: "*full, bushy" },
  { name: "Banksia praemorsa (Cut-leaf Banksia)", price1g: "$14.95", price5g: "$38.95", condition: "medium-full" },
  { name: "Banksia serrata (Saw Leaf Banksia)", price5g: "$42.95", condition: "*full, strong leader" },
  { name: "Beschorneria yuccoides (Mexican Lily)", price1g: "$8.95", price5g: "$22.95", condition: "*full, clean rosettes" },
  { name: "Beschorneria yuccoides 'Flamingo Glow'", price1g: "$10.45", price2g: "$20.95", price5g: "$23.95", condition: "full, variegated" },
  { name: "Billbergia nutans (Queen's Tears)", price1g: "$6.95", condition: "*full clump, some buds" },
  { name: "Blechnum brasiliense (Brazilian Tree Fern)", price1g: "$9.95", price5g: "$26.95", condition: "*full, new red fronds" },
  { name: "Brachysema praemorsum 'Bronze Butterfly'", price1g: "$8.95", price5g: "$22.95", condition: "full, bronze flush, buds" },
  { name: "Brugmansia 'Charles Grimaldi' (Angel’s Trumpet)", price1g: "$12.95", price5g: "$32.95", condition: "*full, lush, buds" },
  { name: "Brugmansia 'Double White' (Angel’s Trumpet)", price1g: "$14.95", price5g: "$36.95", condition: "*full, double buds" },
  { name: "Brugmansia 'Dr. Seuss' (Angel’s Trumpet)", price1g: "$12.95", price5g: "$32.95", condition: "full, buds" },
  { name: "Brugmansia 'Jamaica Yellow' (Angel’s Trumpet)", price1g: "$11.95", price5g: "$29.95", condition: "full, clean" },
  { name: "Brugmansia 'Peaches and Cream' (Angel’s Trumpet)", price1g: "$15.95", price5g: "$39.95", condition: "*full, variegated, prime" },
  { name: "Brugmansia 'Pink Beauty' (Angel’s Trumpet)", price1g: "$12.95", price5g: "$32.95", condition: "*full, buds/blm" },
  { name: "Brugmansia sanguinea (Eagle Tree)", price1g: "$14.95", price5g: "$36.95", condition: "medium-full, sturdy" },
  { name: "Brugmansia 'Shredded White' (Angel’s Trumpet)", price1g: "$13.95", price5g: "$34.95", condition: "full, rare form" },
  { name: "Brugmansia suaveolens variegata (Angel’s Trumpet)", price1g: "$15.95", price5g: "$39.95", condition: "*full, creamy variegation" },
  { name: "Brugmansia 'Velvet Rose' (Angel’s Trumpet)", price1g: "$13.95", price5g: "$34.95", condition: "*full, buds" },
  { name: "Brunnera macrophylla 'Jack Frost'", price1g: "$7.95", condition: "*full, bright silver" },
  { name: "Cannomois grandis (Bellreed)", price1g: "$12.95", price5g: "$32.95", condition: "medium-tall, nice" },
  { name: "Carex oshimensis 'Evergold' (Evergold Sedge)", price1g: "$5.95", condition: "full, prime" },
  { name: "Carex oshimensis 'Eversheen'", price1g: "$5.95", condition: "full, bright lime center" },
  { name: "Carex testacea (Orange NZ Sedge)", price1g: "$5.95", condition: "full, orange tips" },
  { name: "Caryopteris incana (Bluebeard)", price1g: "$6.45", price5g: "$16.95", condition: "full, buds/blm" },
  { name: "Caryopteris x clandonensis 'Sterling Silver'", price1g: "$6.95", price5g: "$18.95", condition: "*full, silver/blue" },
  { name: "Catananche caerulea (Cupid's Dart)", price1g: "$5.45", condition: "full, buds/blm" },
  { name: "Ceanothus 'Tuxedo' (Tuxedo Lilac)", price1g: "$8.95", price5g: "$24.95", condition: "*full, dark foliage" },
  { name: "Cestrum newellii (Red Cestrum)", price1g: "$7.45", price5g: "$19.95", condition: "medium-full, buds" },
  { name: "Choisya ternata (Mexican Orange)", price1g: "$6.45", price5g: "$18.95", condition: "*full, fragrant" },
  { name: "Choisya ternata 'Sundance'", price1g: "$6.95", price5g: "$21.95", condition: "*full, great color" },
  { name: "Chondropetalum elephantinum (Large Cape Rush)", price1g: "$8.95", price5g: "$22.95", condition: "*full, sturdy" },
  { name: "Chondropetalum tectorum (Cape Rush)", price1g: "$7.95", price5g: "$19.95", condition: "*full" },
  { name: "Chondropetalum tectorum (dwarf form)", price1g: "$8.25", price5g: "$20.95", condition: "full, compact" },
  { name: "Chondropetalum tectorum (red bract form)", price1g: "$8.45", price5g: "$21.95", condition: "full, nice bracts" },
  { name: "Chorizema 'Bush Flame'", price1g: "$7.95", condition: "*full, buds/blm" },
  { name: "Chrysocephalum apiculatum 'Silver and Gold'", price1g: "$5.95", condition: "full, silver foliage, blm" },
  { name: "Cimicifuga atropurpurea (Bugbane)", price1g: "$8.95", condition: "*full, dark lacy leaves" },
  { name: "Clerodendrum bungei (Rose Glorybower)", price1g: "$8.45", price5g: "$22.95", condition: "medium-full, buds" },
  { name: "Clerodendrum trichotomum (Harlequin Glorybower)", price5g: "$28.95", condition: "*full, sturdy" },
  { name: "Clianthus puniceus 'Rosea' (Pink Kaka Beak)", price1g: "$9.95", price5g: "$26.95", condition: "*full, lush" },
  { name: "Colocasia 'Black Magic' (Black Elephant Ear)", price1g: "$9.45", price2g: "$18.95", condition: "*full, dark" },
  { name: "Colocasia esculenta 'Illustris' (Imperial Taro)", price1g: "$9.45", price2g: "$18.95", condition: "*full, patterned" },
  { name: "Colocasia esculenta 'Jet Black Wonder'", price1g: "$9.95", price2g: "$19.95", condition: "full, bold black" },
  { name: "Coprosma 'Black Cloud' (Mirror Plant)", price1g: "$6.95", price5g: "$18.95", condition: "*full, high gloss" },
  { name: "Coprosma 'Evening Glow' (Mirror Plant)", price1g: "$6.95", price5g: "$18.95", condition: "*full, fire colors" },
  { name: "Coprosma 'Rainbow Surprise' (Mirror Plant)", price1g: "$6.95", price5g: "$18.95", condition: "*full, multicolored" },
  { name: "Coprosma 'Tequila Sunrise' (Mirror Plant)", price1g: "$6.95", price5g: "$18.95", condition: "*full, sunset tones" },
  { name: "Cordyline australis 'Charlie Boy' PP20,139", price5g: "$24.95", condition: "medium, nice color" },
  { name: "Cordyline australis 'Pink Passion'", price1g: "$10.95", price5g: "$28.95", condition: "*full, vivid pink" },
  { name: "Cordyline australis 'Red Star'", price1g: "$8.95", price5g: "$22.95", condition: "*full, deep bronze" },
  { name: "Cordyline 'Can Can'", price1g: "$9.95", price5g: "$26.95", condition: "full, pink flush" },
  { name: "Cordyline 'Cha Cha'", price1g: "$9.95", price5g: "$26.95", condition: "full, apricot blend" },
  { name: "Cordyline 'Design A Line Burgundy'", price1g: "$9.95", price5g: "$26.95", condition: "*full fountain" },
  { name: "Cordyline 'Renegade'", price1g: "$10.45", price5g: "$28.95", condition: "*full, glossy black" },
  { name: "Cordyline australis 'Torbay Dazzler'", price1g: "$9.45", price5g: "$24.95", condition: "full, variegated" },
  { name: "Coreopsis Big Bang 'Cosmic Eye'", price1g: "$5.45", condition: "full, buds/blm" },
  { name: "Coreopsis 'Cranberry Ice'", price1g: "$5.45", condition: "full, buds/blm" },
  { name: "Coreopsis 'Garnet'", price1g: "$5.45", condition: "full, ruby blooms" },
  { name: "Coreopsis grandiflora", price1g: "$4.95", condition: "full, buds" },
  { name: "Coreopsis grandiflora 'Tequila Sunrise'", price1g: "$5.45", condition: "full, variegated leaves" },
  { name: "Coreopsis 'Jethro Tull' (Fluted Tickseed)", price1g: "$5.45", condition: "*full, buds/blm" },
  { name: "Coreopsis 'Limerock Passion'", price1g: "$5.45", condition: "full, lavender blooms" },
  { name: "Coreopsis 'Limerock Ruby'", price1g: "$5.45", condition: "full, ruby blooms" },
  { name: "Correa 'Dusky Bells' ('Carmine Bells')", price1g: "$7.95", price5g: "$21.95", condition: "*full, blooming" },
  { name: "Correa 'Wyn's Wonder' (Variegated)", price1g: "$8.45", price5g: "$22.95", condition: "*full, variegated, blm" },
  { name: "Cosmos atrosanguineus (Chocolate Cosmos)", price1g: "$6.95", condition: "*full, chocolate scent, blm" },
  { name: "Cotinus coggygria 'Royal Purple' (Smoke Tree)", price5g: "$29.95", condition: "*full, rich purple" },
  { name: "Cotyledon orbiculata var. orbiculata (Pig's Ear)", price1g: "$6.45", condition: "*full, chalky gray" },
  { name: "Crassula capitella 'Campfire'", price1g: "$5.95", condition: "*full, brilliant scarlet" },
  { name: "Crassula corymbulosa (Red Pagoda)", price1g: "$5.95", condition: "full, red-tipped" },
  { name: "Crassula ovata 'Hobbit' (Hobbit Jade)", price1g: "$6.45", price2g: "$14.95", condition: "*full, clean" },
  { name: "Crocosmia aurea (Golden Montbretia)", price1g: "$5.95", condition: "full, robust" },
  { name: "Crocosmia 'Emily McKenzie'", price1g: "$5.95", condition: "full, buds" },
  { name: "Crocosmia 'Lucifer'", price1g: "$6.45", price5g: "$16.95", condition: "*full, scarlet spikes" },
  { name: "Crowea exalata 'Ryan's Star'", price1g: "$7.95", condition: "*full, starry pink blm" },
  { name: "Crowea 'Parry's Hybrid'", price1g: "$7.95", condition: "full, lush, blm" },
  { name: "Crowea 'Pink Star'", price1g: "$7.95", condition: "*full, buds/blm" },
  { name: "Cuphea aequipetala (Mexican Loosestrife)", price1g: "$5.45", condition: "full, blm" },
  { name: "Cuphea 'David Verity' (Cigar Plant)", price1g: "$5.45", condition: "*full, loaded with blm" },
  { name: "Cuphea ignea 'Starfire pink'", price1g: "$5.45", condition: "*full, bright pink blm" },
  { name: "Cuphea llavea (Bat-faced Cuphea)", price1g: "$5.45", condition: "full, blm" },
  { name: "Cuphea micropetala (Candy Corn Plant)", price1g: "$5.95", price5g: "$16.95", condition: "medium-full, buds" },
  { name: "Cuphea oreophila 'Orange Flame'", price1g: "$5.45", condition: "full, bright orange blm" },
  { name: "Cuphea 'Strybing Sunset'", price1g: "$5.45", condition: "full, blm" },
  { name: "Cyperus textilis (Papyrus)", price1g: "$6.95", price5g: "$18.95", condition: "*full umbrellas" },
  { name: "Dahlia 'Juliet' (Happy Single Series)", price1g: "$6.95", condition: "*full, dark foliage, buds/blm" },
  { name: "Dahlia 'Mystic Enchantment'", price1g: "$7.45", condition: "*full, dark leaves, fiery blm" },
  { name: "Dahlia 'Mystic Illusion'", price1g: "$7.45", condition: "*full, dark foliage, yellow blm" },
  { name: "Darwinia leiostyla 'Mt. Trio'", price1g: "$10.95", price5g: "$28.95", condition: "medium-full, nodding bells" },
  { name: "Datura metel 'Double Purple' (Angel’s Trumpet)", price1g: "$7.95", price5g: "$21.95", condition: "*full, fragrant buds" },
  { name: "Delosperma 'Jewel of Desert Garnet'", price1g: "$4.95", condition: "*full mat, red blm" },
  { name: "Dichroa febrifuga (Blue Evergreen Hydrangea)", price1g: "$8.95", price5g: "$24.95", condition: "*full, buds/berries" },
  { name: "Digitalis x mertonensis (Strawberry Foxglove)", price1g: "$5.95", condition: "*full, lush rosettes, buds" },
  { name: "Dryopteris erythrosora 'Brilliance' (Autumn Fern)", price1g: "$7.95", price2g: "$16.95", condition: "*full, coppery new fronds" },
  { name: "Dyckia 'Morris Hobbs'", price1g: "$9.95", price2g: "$19.95", condition: "*full, spiny bronze" },
  { name: "Farfugium japonicum 'Crested Leopard'", price1g: "$11.95", price2g: "$22.95", condition: "*full, ruffled dots, fresh" },
  { name: "Fascicularia pitcairnifolia", price1g: "$12.95", price2g: "$24.95", condition: "*full spiny rosettes, centers coloring" },
  { name: "Festuca glauca (Blue Fescue Grass)", price1g: "$4.95", condition: "*full, blue color" },
  { name: "Festuca glauca 'Beyond Blue'", price1g: "$5.45", condition: "*full, vivid powder blue" },
  { name: "Fremontodendron 'California Glory' (Flannel Bush)", price1g: "$11.95", price5g: "$29.95", price2g: "$79.95 (15g)", condition: "*full, fuzzy foliage, buds/blm" },
  { name: "Fremontodendron 'Ken Taylor' (Flannel Bush)", price1g: "$11.95", price5g: "$29.95", condition: "*full, low spreading, buds" },
  { name: "Fremontodendron 'San Gabriel' (Flannel Bush)", price1g: "$12.95", price5g: "$32.95", price2g: "$85.00 (15g)", condition: "*full, large lobed leaves, buds" },
  { name: "Fuchsia boliviana", price1g: "$7.95", price5g: "$22.95", condition: "*full, long scarlet clusters, blm" },
  { name: "Fuchsia boliviana 'Alba'", price1g: "$8.45", price5g: "$24.95", condition: "*full, white/coral tubes, blm" },
  { name: "Fuchsia denticulata", price1g: "$7.95", price5g: "$22.95", condition: "*full, salmon/green tubes, blm" },
  { name: "Fuchsia paniculata (Berry Bush Fuchsia)", price1g: "$7.95", price5g: "$22.95", condition: "*full, lilac panicles, blm" },
  { name: "Fuchsia procumbens (Creeping Fuchsia)", price1g: "$6.95", condition: "*full trailing mat, flowers & berries" },
  { name: "Fuchsia procumbens 'Variegata' (Creeping Fuchsia)", price1g: "$7.45", condition: "*full variegated mat, pink flush" },
  { name: "Fuchsia speciosa", price1g: "$7.45", price5g: "$19.95", condition: "*full, bicolored bells, blm" },
  { name: "Fuchsia triphylla 'Firecracker' (Honeysuckle Fuchsia)", price1g: "$7.95", condition: "*full, variegated magenta leaves, coral blm" },
  { name: "Gaillardia aristata 'Gallo Dark Bicolor' (Blanket Flower)", price1g: "$5.95", condition: "*full, compact, buds/blm" },
  { name: "Gaillardia 'Galya Corneto Flame' (Corneto Flame Blanket Flower)", price1g: "$5.95", condition: "*full, trumpet petals, blm" },
  { name: "Gaillardia 'Galya Wild Fire' (Wild Fire Blanket Flower)", price1g: "$5.95", condition: "*full, crimson with gold, buds/blm" },
  { name: "Gaillardia grandiflora 'Fanfare Blaze' (Blanket Flower)", price1g: "$5.95", condition: "*full, fluted pinwheels, blm" },
  { name: "Geum coccineum 'Mrs. Bradshaw'", price1g: "$6.45", condition: "*full rosettes, tall red buds" },
  { name: "Geum 'Totally Tangerine'", price1g: "$6.95", price2g: "$15.95", condition: "*full, heavy bloom, vibrant apricot" },
  { name: "Grevillea 'Austraflora Fanfare'", price1g: "$9.95", price5g: "$27.95", condition: "*full spreading mat, toothbrush blm" },
  { name: "Grevillea bauerii", price1g: "$9.95", price5g: "$26.95", condition: "*full, mounding, winter buds" },
  { name: "Grevillea 'Bonfire'", price1g: "$10.95", price5g: "$29.95", condition: "*full upright, fiery red spider blm" },
  { name: "Grevillea 'Canberra Gem'", price1g: "$9.95", price5g: "$27.95", condition: "*full, dense fine needles, pink/red blm" },
  { name: "Grevillea 'Frosty Pink'", price1g: "$9.95", price5g: "$26.95", condition: "*full, silver woolly foliage, soft pink blm" },
  { name: "Grevillea 'Kings Celebration'", price1g: "$12.95", price5g: "$34.95", price2g: "$85.00 (15g)", condition: "*full, large tricolor brushes, buds/blm" },
  { name: "Grevillea 'Kings Fire'", price1g: "$12.95", price5g: "$34.95", price2g: "$85.00 (15g)", condition: "*full, glowing scarlet brushes, blm" },
  { name: "Grevillea lanigera 'Coastal Gem'", price1g: "$8.95", price5g: "$24.95", condition: "*full, flat spreading carpet, pink blm" },
  { name: "Grevillea lanigera 'Mt. Tamboritha'", price1g: "$8.95", price5g: "$24.95", condition: "*full, dense woolly mounds, heavy buds" },
  { name: "Grevillea lavandulacea 'Penola'", price1g: "$9.95", price5g: "$28.95", condition: "*full, lavender-like gray leaves, deep red blm" },
  { name: "Grevillea 'Long John'", price5g: "$38.95", price2g: "$89.95 (15g)", condition: "*full, tall upright, coral brushes" },
  { name: "Grevillea 'Moonlight'", price5g: "$36.95", price2g: "$85.00 (15g)", condition: "*full, giant ivory spikes, buds/blm" },
  { name: "Grevillea 'Ned Kelly'", price1g: "$11.95", price5g: "$32.95", price2g: "$79.95 (15g)", condition: "*full, apricot-red brushes, buds/blm" },
  { name: "Grevillea 'Noelii'", price1g: "$8.95", price5g: "$24.95", condition: "*full, bright green hedge form, pink blm" },
  { name: "Grevillea 'Peaches and Cream' PP#18,035", price5g: "$34.95", price2g: "$79.95 (15g)", condition: "*full, peach/cream brushes, buds/blm" },
  { name: "Grevillea 'Poorinda Blondie'", price5g: "$29.95", price2g: "$75.00 (15g)", condition: "*full, golden-yellow toothbrush blm" },
  { name: "Grevillea 'Red Hooks'", price5g: "$32.95", price2g: "$79.95 (15g)", condition: "*full, wide spreading, scarlet comb blm" },
  { name: "Grevillea 'Robyn Gordon'", price1g: "$11.95", price5g: "$32.95", price2g: "$79.95 (15g)", condition: "*full, prolific red brushes, continuous blm" },
  { name: "Grevillea 'Ruby Clusters'", price5g: "$29.95", price2g: "$75.00 (15g)", condition: "*full, pendant ruby jewels, chartreuse tips" },
  { name: "Gunnera manicata (Dinosaur Food)", price1g: "$14.95", price5g: "$39.95", price2g: "$95.00 (15g)", condition: "*full, massive prickly emerging umbrella leaves" },
  { name: "Hakonechloa macra 'All Gold' (Japanese Forest Grass)", price1g: "$8.95", price2g: "$18.95", condition: "*full cascading gold ribbons" },
  { name: "Hakonechloa macra 'Aureola' (Japanese Forest Grass)", price1g: "$8.95", price2g: "$18.95", condition: "*full gold/green stripes, award-winner" },
  { name: "Hakonechloa macra 'Sunflare' (Japanese Forest Grass)", price1g: "$9.45", price2g: "$19.95", condition: "*full, gold with crimson tipped blades" },
  { name: "Halimiocistus wintonensis (Rockrose)", price1g: "$6.95", price5g: "$19.95", condition: "*full, grey leaves, maroon eye blm" },
  { name: "Halimiocistus wintonensis 'Merrist Wood Cream' (Rockrose)", price1g: "$7.45", price5g: "$21.95", condition: "*full, cream petals, dark eye, blm" },
  { name: "Hebe albicans 'Red Edge'", price1g: "$6.95", price5g: "$18.95", condition: "*full silver domes, burgundy edges" },
  { name: "Hebe 'Pretty In Pink'", price1g: "$7.45", price5g: "$19.95", condition: "*full, bronze leaves flushed vivid pink" },
  { name: "Hebe speciosa 'Tricolor' (Purple Tips)", price1g: "$7.45", price5g: "$19.95", condition: "*full, creamy variegation, violet tips" },
  { name: "Hebe 'Wiri Blush'", price1g: "$6.95", price5g: "$18.95", condition: "*full dense mounds, rose-pink blm" },
  { name: "Helichrysum italicum (Curry Plant)", price1g: "$4.95", price2g: "$12.95", condition: "*full, intensely aromatic silver needles" },
  { name: "Heuchera 'Blackout' (Coral Bells)", price1g: "$6.95", condition: "*full, glossy near-black rosettes" },
  { name: "Heuchera 'Caramel' (Coral Bells)", price1g: "$6.95", condition: "*full, butterscotch-apricot ruffles" },
  { name: "Heuchera 'Circus' (Coral Bells)", price1g: "$6.95", condition: "*full, chartreuse with dark maroon veining" },
  { name: "Heuchera micrantha 'Palace Purple' (Coral Bells)", price1g: "$5.95", condition: "*full, deep bronze-purple rosettes" },
  { name: "Heuchera 'Miracle' (Coral Bells)", price1g: "$6.95", condition: "*full, brick red with lime rim" },
  { name: "Heuchera 'Silver Scrolls' (Coral Bells)", price1g: "$6.95", condition: "*full, metallic pewter with violet veins" },
  { name: "Heuchera 'Vulcano' (Coral Bells)", price1g: "$6.95", condition: "*full, glowing copper and molten amber" },
  { name: "Heucherella 'Redstone Falls' (Foamy Bells)", price1g: "$7.95", condition: "*full cascading trailer, cinnamon tones" },
  { name: "Hydrangea macrophylla 'Nigra' (Black Stem Hydrangea)", price1g: "$11.95", price5g: "$29.95", condition: "*full, jet-black ebony canes, heavy buds" },
  { name: "Impatiens arguta (Hardy Blue Touch-Me-Not)", price1g: "$6.95", condition: "*full, hooded violet-blue orchid blm" },
  { name: "Impatiens oliveri (Poor Man's Rhododendron)", price1g: "$7.45", price5g: "$19.95", condition: "*full, large succulent stems, pale pink blm" },
  { name: "Imperata cylindrica 'Red Baron' (Japanese Blood Grass)", price1g: "$5.95", condition: "*full, glowing ruby red blades" },
  { name: "Iochroma cyaneum", price1g: "$8.95", price5g: "$24.95", condition: "*full, long royal blue trumpets, blm" },
  { name: "Iochroma cyaneum 'Magenta'", price1g: "$9.45", price5g: "$26.95", condition: "*full, vibrant magenta tubes, blm" },
  { name: "Iochroma fuchsioides", price1g: "$9.45", price5g: "$26.95", condition: "*full, scarlet-orange pendant clusters, blm" },
  { name: "Iochroma grandiflora", price1g: "$9.95", price5g: "$27.95", condition: "*full, large flared indigo bells, blm" },
  { name: "Iris ensata 'Variegata' (Variegated Japanese Iris)", price1g: "$7.95", condition: "*full sword foliage, white striped, buds" },
  { name: "Iris laevigata 'Variegata' (Variegated Water Iris)", price1g: "$7.95", condition: "*full aquatic clumps, cobalt blm" },
  { name: "Ischyrolepis subverticillata (Broom Reed Restio)", price1g: "$11.95", price5g: "$29.95", price2g: "$79.95 (15g)", condition: "*full, fine feathery whorls, golden heads" },
  { name: "Ismene festalis 'Exotica' (White Peruvian Daffodil)", price1g: "$8.95", condition: "*full bulbs, fragrant spidery white blm" },
  { name: "Isoplexis canariensis (Canary Island Foxglove)", price1g: "$9.95", price5g: "$26.95", condition: "*full woody stems, apricot-orange spires, blm" },
  { name: "Isoplexis chalcantha (Copper Canary Foxglove)", price1g: "$10.95", price5g: "$29.95", condition: "*full rare species, bronze-copper spires, buds" },
  { name: "Isopogon formosus (Rose Coneflower)", price1g: "$11.95", price5g: "$32.95", condition: "*full, divided needles, rose-magenta drumsticks" },
  { name: "Kalanchoe bracteata (Silver Teaspoons)", price1g: "$5.95", price2g: "$12.95", condition: "*full, metallic silvery-white spoons" },
  { name: "Kalanchoe marmorata (Spotted Kalanchoe / Penwiper)", price1g: "$5.95", price2g: "$14.95", condition: "*full, purple mottled scalloped leaves" },
  { name: "Kalanchoe orgyalis (Copper Spoons)", price1g: "$6.95", price2g: "$16.95", condition: "*full, tactile cinnamon-copper felted leaves" },
  { name: "Kalanchoe tomentosa (Panda Plant)", price1g: "$4.95", price2g: "$11.95", condition: "*full plush silver felt, dark brown spotted margins" },
  { name: "Kalanchoe tomentosa 'Chocolate Soldier' (Panda Plant)", price1g: "$5.95", price2g: "$12.95", condition: "*full golden-fawn felt, dark chocolate edges" },
  { name: "Lamiastrum galeobdolon 'Herman's Pride' (Yellow Archangel)", price1g: "$5.95", condition: "*full, silver-netted leaves, yellow blm" },
  { name: "Lamium maculatum 'Anne Greenway'", price1g: "$5.45", condition: "*full tricolor carpet, mauve-pink blm" },
  { name: "Lamium maculatum 'Purple Dragon'", price1g: "$5.45", condition: "*full silver carpet, deep royal purple blm" },
  { name: "Lavandula angustifolia 'Munstead' (English Lavender)", price1g: "$5.95", condition: "*full aromatic mounds, lavender-blue blm" },
  { name: "Lavandula angustifolia 'Violet Intrigue' (English Lavender)", price1g: "$6.45", condition: "*full, dark saturated violet spikes, blm" },
  { name: "Lavandula stoechas 'Otto Quast' (Spanish Lavender)", price1g: "$5.95", price5g: "$16.95", condition: "*full, plump purple cones with large ears, blm" },
  { name: "Lavandula stoechas 'Silver Anouk'", price1g: "$6.45", condition: "*full silvery foliage, purple flags, blm" },
  { name: "Lavandula x intermedia 'Grosso'", price1g: "$5.95", price5g: "$16.95", condition: "*full, long fragrant oil spikes, heavy buds" },
  { name: "Lavatera clementii 'Kew Rose' (Tree Mallow)", price1g: "$6.95", price5g: "$18.95", condition: "*full bushy shrubs, satin rose blm" },
  { name: "Leonotis leonurus (Lion's Tail)", price1g: "$6.95", price5g: "$18.95", condition: "*full, tiered fuzzy orange whorls, blm" },
  { name: "Leonotis leonurus 'Alba' (White Lion's Tail)", price1g: "$7.95", price5g: "$21.95", condition: "*full, pure white velvet tiers, blm" },
  { name: "Leucadendron argenteum (Silver Tree)", price5g: "$34.95", price2g: "$85.00 (15g)", condition: "*full, gleaming silvery silk leaves" },
  { name: "Leucadendron 'Chief Mike'", price1g: "$11.95", price5g: "$32.95", condition: "*full, burgundy stems, red bracts" },
  { name: "Leucadendron 'Cloudbank Ginny'", price5g: "$34.95", condition: "*full, peach-apricot & crimson bracts, blm" },
  { name: "Leucadendron 'Duet'", price1g: "$10.95", price5g: "$29.95", condition: "*full compact, cream-yellow bracts, chocolate cones" },
  { name: "Leucadendron 'Ebony' PP 23,258", price5g: "$32.95", condition: "small-medium" },
  { name: "Leucadendron discolor (Piketberg Conebush)", price5g: "$34.95", condition: "*full, ivory-yellow bracts, bright red male cones" },
  { name: "Leucadendron gandogeri (Broad-leaf Conebush)", price5g: "$32.95", condition: "*full broad foliage, golden-apricot bracts" },
  { name: "Leucadendron 'Jester' (Robin's Variegated)", price5g: "$34.95", condition: "*full, cream & hot flamingo-pink bracts" },
  { name: "Leucadendron 'Little Bit'", price1g: "$9.95", price5g: "$26.95", condition: "*full dwarf mounding, red tipped" },
  { name: "Leucadendron 'Maui Sunset'", price5g: "$32.95", condition: "*full, yellow & sunset orange-red bracts" },
  { name: "Leucadendron 'Red Gem'", price1g: "$10.95", price5g: "$28.95", condition: "*full, deep mahogany-red bracts" },
  { name: "Leucadendron 'Safari Goldstrike'", price5g: "$29.95", condition: "*full tall cut-flower stems, glowing gold bracts" },
  { name: "Leucadendron salignum 'Blush'", price1g: "$9.95", price5g: "$27.95", condition: "*full, blush-pink and red tips" },
  { name: "Leucadendron salignum 'Chief'", price1g: "$9.95", price5g: "$27.95", condition: "*full, rich scarlet-crimson bracts" },
  { name: "Leucadendron salignum 'Golden Tip'", price1g: "$9.95", price5g: "$27.95", condition: "*full, bright chartreuse-gold tips" },
  { name: "Leucadendron salignum 'Winter Red'", price1g: "$9.95", price5g: "$27.95", condition: "*full, intense winter ruby-red bracts" },
  { name: "Leucadendron 'Silvan Red'", price5g: "$32.95", condition: "*full, plum-red to blood-red bracts" },
  { name: "Leucadendron 'Wilson’s Wonder'", price5g: "$32.95", condition: "*full, large golden bracts edged red" },
  { name: "Leucadendron 'Yaeli'", price5g: "$32.95", condition: "*full, chartreuse-gold bracts, neat cones" },
  { name: "Leucospermum 'Blanch Ito' (Pincushion)", price5g: "$34.95", condition: "*full, fiery orange-red flower ribbons, blm" },
  { name: "Leucospermum 'Brandi' (L. 'Brandi Dela Cruz')", price5g: "$34.95", condition: "*full, salmon-apricot pincushions, blm" },
  { name: "Leucospermum 'Caroline' (Pincushion)", price5g: "$34.95", condition: "*full, coral-pink and salmon domes, blm" },
  { name: "Leucospermum cordifolium 'Flame Giant' (Vlam)", price5g: "$36.95", condition: "*full, giant 5-inch flame-orange heads, blm" },
  { name: "Leucospermum cordifolium Orange (Nodding Pincushion)", price5g: "$32.95", condition: "*full, bright tangerine domes, blm" },
  { name: "Leucospermum cuneiforme (Wart-Stemmed Pincushion)", price5g: "$32.95", condition: "*full, yellow to amber styles, blm" },
  { name: "Leucospermum pattersonii 'Brothers' (Limestone Pincushion)", price5g: "$34.95", condition: "*full, brick-red to orange heads, blm" },
  { name: "Leucospermum 'Scarlet Ribbon' (Pincushion)", price5g: "$34.95", condition: "*full, deep scarlet ribbons with yellow tips, blm" },
  { name: "Leucospermum 'Sunrise' (Pincushion)", price5g: "$34.95", condition: "*full, early orange-red pincushions, blm" },
  { name: "Leucospermum 'Tango' (Pincushion)", price5g: "$34.95", condition: "*full, vibrant burnt-orange heads, blm" },
  { name: "Leucospermum 'Tango-like' (Pincushion)", price5g: "$34.95", condition: "*full compact, glowing copper-orange, blm" },
  { name: "Leucospermum 'Veldfire' (Pincushion)", price5g: "$36.95", condition: "*full, bicolor apricot-yellow and red styles, blm" },
  { name: "Leymus arenarius 'Findhorn' (Dwarf Blue Rye)", price1g: "$5.95", condition: "*full, metallic powdery-blue blades" },
  { name: "Libertia ixioides 'Goldfinger'", price1g: "$7.95", price5g: "$22.95", condition: "*full fans, central golden-amber stripe" },
  { name: "Libertia ixioides 'Taupo Blaze' (NZ Iris)", price1g: "$7.95", price5g: "$22.95", condition: "*full fans, burnt-orange & copper blaze" },
  { name: "Libertia peregrinans (Orange NZ Iris)", price1g: "$7.95", condition: "*full creeping clumps, glowing copper foliage" },
  { name: "Ligularia dentata 'Desdemona' (Big Leaf Goldenray)", price1g: "$8.95", price2g: "$19.95", condition: "*full purple-bronze kidney leaves, golden daisies" },
  { name: "Ligularia przewalskii (Goldenray)", price1g: "$8.95", price2g: "$19.95", condition: "*full jagged palmate leaves, dark stems, yellow spires" },
  { name: "Lithodora diffusa 'Grace Ward'", price1g: "$5.95", condition: "*full mats, vivid electric blue star blm" },
  { name: "Lobelia fulgens 'Queen Victoria'", price1g: "$6.45", condition: "*full dark chocolate-purple foliage, scarlet spires" },
  { name: "Lobelia laxiflora (Mexican Bush Lobelia)", price1g: "$5.95", price5g: "$16.95", condition: "*full, scarlet and yellow tubular bells, blm" },
  { name: "Lobelia siphilitica (Blue Cardinal Flower)", price1g: "$5.95", condition: "*full native spikes, lavender-blue blm" },
  { name: "Loropetalum chinense 'Purple Majesty' (Fringe Flower)", price1g: "$8.95", price5g: "$24.95", condition: "*full deep purple foliage, bright fuchsia ribbons, blm" },
  { name: "Lotus berthelotii 'Scarlet' (Parrot's Beak)", price1g: "$5.95", condition: "*full silver trailing curtains, scarlet flame blm" },
  { name: "Lychnis coronaria (Rose Campion)", price1g: "$5.45", condition: "*full silver velvet rosettes, incandescent magenta blm" },
  { name: "Macropidia fuliginosa (Black Kangaroo Paw)", price1g: "$12.95", price5g: "$34.95", condition: "*full rare native, velvet jet-black & green blm" },
  { name: "Maireana sedifolia (Pearl Bluebush)", price1g: "$8.95", price5g: "$24.95", condition: "*full, gleaming silvery-white pearl felt" },
  { name: "Meconopsis grandis (Himalayan Blue Poppy)", price1g: "$9.95", price2g: "$24.95", condition: "*full, legendary sky-blue saucers, buds/blm" },
  { name: "Melianthus comosus (Honey Bush)", price1g: "$8.95", price5g: "$24.95", condition: "*full serrated grey foliage, scarlet bracts" },
  { name: "Melianthus major (Giant Honey Bush)", price1g: "$9.95", price5g: "$26.95", price2g: "$65.00 (15g)", condition: "*full glaucous blue leaves, dark maroon spikes" },
  { name: "Mimetes chrysanthus (Golden Pagoda)", price5g: "$38.95", condition: "*full rare protea, golden-yellow & red heads" },
  { name: "Mimulus ringens (Allegheny Monkey Flower)", price1g: "$5.95", condition: "*full native wetland, lavender-blue blm" },
  { name: "Mimulus x hybridus 'Shade Loving Mixed'", price1g: "$4.95", condition: "*full shade mounds, vibrant spotted velvet blm" },
  { name: "Miscanthus sinensis 'Zebrinus' (Zebra Grass)", price1g: "$6.95", price5g: "$18.95", condition: "*full arching blades with horizontal gold bands" },
  { name: "Mitraria coccinea (Chilean Mitre Flower)", price1g: "$8.95", condition: "*full evergreen climber, glowing scarlet urns, blm" },
  { name: "Muhlenbergia capillaris (Pink Muhly Grass)", price1g: "$5.95", price5g: "$16.95", condition: "*full fine clumps, cotton-candy pink clouds" },
  { name: "Muhlenbergia capillaris 'White Cloud'", price1g: "$6.45", price5g: "$17.95", condition: "*full, airy frosted ivory-white plumes" },
  { name: "Musa basjoo (Hardy Fiber Banana)", price5g: "$29.95", price2g: "$75.00 (15g)", condition: "*full giant tropical leaves, cold hardy" },
  { name: "Musa zebrina 'Rojo' (Blood Banana)", price5g: "$32.95", price2g: "$79.95 (15g)", condition: "*full, green splashed blood-red, wine undersides" },
  { name: "Origanum 'Kent Beauty' (Ornamental Oregano)", price1g: "$5.95", condition: "*full cascading bracts, mauve-pink blush, blm" },
  { name: "Oscularia deltoides (Deltoid / Pink Ice Plant)", price1g: "$4.95", price2g: "$11.95", condition: "*full blue-grey toothed mats, fragrant pink daisies, blm" },
  { name: "Paulownia tomentosa (Empress Tree)", price5g: "$34.95", price2g: "$85.00 (15g)", condition: "*full specimen, huge velvety leaves" },
  { name: "Penstemon 'Burgundy'", price1g: "$5.95", price5g: "$15.95", condition: "*full, deep wine-burgundy spires, blm" },
  { name: "Penstemon campanulatus (Bell-Flowered Beard Tongue)", price1g: "$5.95", condition: "*full, graceful rosy-purple bells, blm" },
  { name: "Penstemon digitalis 'Husker Red'", price1g: "$6.45", condition: "*full bronze-purple foliage, white bell spires, blm" },
  { name: "Penstemon gloxinioides 'Apple Blossom'", price1g: "$5.95", price5g: "$15.95", condition: "*full, pastel blush-pink & white bells, blm" },
  { name: "Penstemon gloxinioides 'Midnite'", price1g: "$5.95", price5g: "$15.95", condition: "*full, royal midnight purple bells, blm" },
  { name: "Perovskia atriplicifolia 'Little Spire' (Russian Sage)", price1g: "$6.45", price5g: "$16.95", condition: "*full aromatic silver foliage, lavender-blue wands, blm" },
  { name: "Persicaria microcephala 'Red Dragon'", price1g: "$6.95", condition: "*full plum-purple chevron leaves, white sprays" },
  { name: "Philotheca myoporoides 'Profusion' (Wax Flower)", price1g: "$8.95", price5g: "$26.95", condition: "*full aromatic foliage, pink buds to pure white stars, blm" },
  { name: "Phlomis purpurea (Purple Jerusalem Sage)", price1g: "$7.95", price5g: "$22.95", condition: "*full grey-green velvet foliage, hooded lilac-pink whorls, blm" },
  { name: "Phormium 'Dark Delight' (Red NZ Flax)", price1g: "$11.95", price5g: "$32.95", condition: "*full dark chocolate-bronze & wine-red arching fans" },
  { name: "Phormium 'Firebird' (Firebird NZ Flax)", price5g: "$34.95", price2g: "$85.00 (15g)", condition: "*full brilliant rose-crimson striped swords" },
  { name: "Phormium 'Guardsman' (NZ Flax)", price5g: "$36.95", price2g: "$89.00 (15g)", condition: "*full tall bronze-maroon swords with scarlet-pink edges" },
  { name: "Phormium 'Red Heart' (NZ Flax)", price1g: "$11.95", price5g: "$32.95", condition: "*full cherry-pink to coral centered blades" },
  { name: "Phygelius X rectus 'Devil's Tears' (Cape Fuchsia)", price1g: "$6.45", price5g: "$16.95", condition: "*full pendant scarlet-red bells, yellow throat, blm" },
  { name: "Phygelius X rectus 'New Sensation' (Cape Fuchsia)", price1g: "$6.45", price5g: "$16.95", condition: "*full bushy, vibrant magenta-fuchsia bells, blm" },
  { name: "Phyla nodiflora (Turkey Tangle Fogfruit / Kurapia)", price1g: "$4.95", condition: "*full dense creeping turf, pink-white flowers, blm" },
  { name: "Phylica pubescens (Flannel Flower / Featherhead)", price1g: "$12.95", price5g: "$34.95", condition: "*full rare silk down heads, cream-gold felt" },
  { name: "Plectranthus amboinicus (Cuban Oregano)", price1g: "$4.95", price2g: "$10.95", condition: "*full aromatic succulent velvet leaves" },
  { name: "Plectranthus argentatus 'Longwood Silver'", price1g: "$5.95", price5g: "$15.95", condition: "*full plush silver velvet foliage, lavender wands" },
  { name: "Plectranthus ciliatus (Swedish Ivy)", price1g: "$4.95", condition: "*full trailing quilted purple-backed foliage" },
  { name: "Plectranthus ciliatus Purple blooms", price1g: "$5.45", condition: "*full purple-backed leaves, saturated lavender spikes, blm" },
  { name: "Plectranthus 'Mona Lavender'", price1g: "$5.95", condition: "*full glossy dark purple-backed mounds, speckled lavender spikes, blm" },
  { name: "Polygala fruticosa 'Petite Butterfly' (Sweet Pea Shrub)", price1g: "$7.95", price5g: "$22.95", condition: "*full compact mounds, magenta butterfly wings, blm" },
  { name: "Polygala myrtifolia 'Grandiflora' (Sweet Pea Bush)", price1g: "$8.95", price5g: "$24.95", condition: "*full bushy shrubs, intense purple winged flowers, blm" },
  { name: "Polygala virgata (Broom Polygala / Purple Broom)", price1g: "$8.95", price5g: "$24.95", condition: "*full wand-like green stems, vivid magenta racemes, blm" },
  { name: "Polygala X dalmaisiana (Sweet Pea Shrub)", price1g: "$7.95", price5g: "$22.95", condition: "*full evergreen bushes, rosy-purple sweet pea blm" },
  { name: "Primula vialii (Orchid Primrose)", price1g: "$6.95", condition: "*full bicolored red & violet-blue conical spires, blm" },
  { name: "Prostanthera ovalifolia 'Purple Haze' (Mint Bush)", price1g: "$8.95", price5g: "$26.95", condition: "*full eucalyptus-mint scent, rich violet floral haze, blm" },
  { name: "Prostanthera ovalifolia 'Variegata' (Variegated Mint Bush)", price1g: "$9.95", price5g: "$27.95", condition: "*full cream-edged aromatic foliage, soft mauve blm" },
  { name: "Prostanthera 'Poorinda Bride' (White Mint Bush)", price1g: "$8.95", price5g: "$26.95", condition: "*full fine aromatic leaves, snowy white bells, blm" },
  { name: "Protea 'Brenda'", price5g: "$38.95", condition: "*full large rose-pink & crimson chalices with dark tufts" },
  { name: "Protea cynaroides (King Protea)", price5g: "$42.95", price2g: "$95.00 (15g)", condition: "*full giant 10-inch silvery-pink chalice bowls, buds/blm" },
  { name: "Protea cynaroides 'Mini-King' (Mini King Protea)", price5g: "$38.95", condition: "*medium-full compact, huge pink chalices, buds/blm" },
  { name: "Protea 'Empress'", price5g: "$39.95", condition: "*full silvery rose-red chalices with black-tufted beards" },
  { name: "Protea laurifolia 'Pink Owl'", price5g: "$38.95", condition: "*full salmon-rose chalices with black & white woolly beards" },
  { name: "Protea laurifolia 'Rose Mink'", price5g: "$38.95", condition: "*full dusky rose-pink heads fringed with soft black velvet fur" },
  { name: "Protea laurifolia 'White Owl'", price5g: "$39.95", condition: "*full pure ivory-white chalices tipped in white & charcoal fur" },
  { name: "Protea 'Pink Ice' (Pink Ice Protea)", price5g: "$36.95", price2g: "$85.00 (15g)", condition: "*full hardy landscape protea, rose-pink chalices with white fur, buds/blm" },
  { name: "Protea 'Sylvia'", price5g: "$38.95", condition: "*full deep reddish-pink chalices with dark purple cones" },
  { name: "Psoralea pinnata (Fountain Bush / Blue Pea Bush)", price1g: "$8.95", price5g: "$26.95", condition: "*full fine weeping foliage, fragrant royal blue & white sweet peas, blm" },
  { name: "Puya alpestris (Sapphire Tower)", price1g: "$14.95", price5g: "$38.95", condition: "*full silver spiky rosettes, rare metallic sapphire-teal towers" },
  { name: "Raoulia australis (Silver Scabweed / Vegetable Sheep)", price1g: "$5.95", condition: "*full ultra-flat silver carpet, yellow button florets, blm" },
  { name: "Rehmannia elata 'Popstar' (Chinese Foxglove)", price1g: "$6.45", price5g: "$16.95", condition: "*full, large magenta-rose trumpets with spotted throat, blm" },
  { name: "Ricinus communis 'Carmencita Red' (Castor Bean)", price1g: "$7.95", price5g: "$22.95", condition: "*full dark bronze-maroon palmate leaves, bright red seed clusters" },
  { name: "Rodgersia pinnata (Featherleaf Rodgersia)", price1g: "$9.95", price2g: "$22.95", condition: "*full huge crinkled pinnate foliage, fluffy pink-ruby plumes" },
  { name: "Salvia africana-lutea (Beach / Golden Sage)", price1g: "$7.95", price5g: "$22.95", condition: "*full aromatic grey foliage, unique rusty-gold hooded blm" },
  { name: "Salvia chamaedryoides (Germander Sage)", price1g: "$6.45", condition: "*full silver mat, intense cobalt blue flowers, blm" },
  { name: "Salvia clevelandii 'Allen Chickering' (CA Native)", price1g: "$7.45", price5g: "$21.95", condition: "*full intensely fragrant silver whorls, tiered violet blm" },
  { name: "Salvia elegans 'Aurea' (Yellow Pineapple Sage)", price1g: "$6.45", price5g: "$18.95", condition: "*full chartreuse pineapple-scented foliage, scarlet tubes" },
  { name: "Salvia 'Furman's Red' (Autumn Sage)", price1g: "$6.45", price5g: "$18.95", condition: "*full compact, vibrant crimson flowers, heavy blm" },
  { name: "Salvia greggii 'Wild Thing'", price1g: "$6.45", price5g: "$18.95", condition: "*full aromatic green leaves, neon cherry-pink flowers, blm" },
  { name: "Salvia guaranitica 'Black & Blue'", price1g: "$6.95", price5g: "$19.95", condition: "*full tall spires, black calyces with electric cobalt blm" },
  { name: "Salvia leucantha (Mexican Bush Sage)", price1g: "$6.45", price5g: "$18.95", condition: "*full arching grey-green stems, velvety purple & white spires, blm" },
  { name: "Salvia microphylla 'Hot Lips'", price1g: "$6.45", price5g: "$18.95", condition: "*full bushy shrubs, striking red & white bicolor blm" },
  { name: "Salvia nemorosa 'Caradonna'", price1g: "$6.45", condition: "*full upright dark purple stems, deep violet-blue spires, blm" },
  { name: "Salvia nemorosa 'May Night' (Violet Sage)", price1g: "$6.45", condition: "*full compact clumps, rich indigo-violet spikes, heavy blm" },
  { name: "Salvia patens 'Guanajuato' (Giant Blue Sage)", price1g: "$7.95", condition: "*full aromatic arrow leaves, huge 2.5\" gentian sky-blue blm" },
  { name: "Salvia spathacea (Hummingbird Sage CA Native)", price1g: "$7.45", price5g: "$21.95", condition: "*full woodland rhizomes, crinkled foliage, ruby magenta whorls" },
  { name: "Salvia 'Waverly' (Lavender & White Sage)", price1g: "$7.95", price5g: "$22.95", condition: "*full graceful arching stems, pale lavender-pink fuzzy spires" },
  { name: "Salvia x jamensis 'Sierra San Antonio'", price1g: "$6.45", price5g: "$18.95", condition: "*full pastel butter-yellow & peachy-salmon bicolor blm" },
  { name: "Sambucus nigra 'Eva Black Lace' (Elderberry)", price5g: "$34.95", condition: "*full dissected dark purple-black lace foliage, pink umbels" },
  { name: "Scleranthus biflorus (Australian Astroturf)", price1g: "$6.95", condition: "*full dense emerald cushion mound, moss-like texture" },
  { name: "Scleranthus uniflorus (New Zealand Moss)", price1g: "$6.95", condition: "*full tight golden-olive alpine cushion, rockery prime" },
  { name: "Sedum makinoi 'Ogon' (Japanese Golden Sedum)", price1g: "$5.95", condition: "*full flat glowing golden-chartreuse carpet, clean" },
  { name: "Sedum morganianum (Burro’s Tail)", price1g: "$8.95", price2g: "$18.95 (Hanging)", condition: "*full trailing silver-blue beaded ropes, lush" },
  { name: "Sedum nussbaumerianum (Coppertone Sedum)", price1g: "$6.45", condition: "*full bright copper-orange & amber succulent rosettes" },
  { name: "Sedum 'Postmans Pride' (Dark Stonecrop)", price1g: "$6.95", condition: "*full near-black purple succulent clumps, ruby cymes" },
  { name: "Sedum rupestre 'Angelina' (Golden Sedum)", price1g: "$5.95", condition: "*full bright chartreuse-gold needle mat, copper winter tones" },
  { name: "Sempervivum arachnoideum (Cobweb Houseleek / Jade Rose)", price1g: "$5.45", condition: "*full tight rosettes with silver cobweb filaments" },
  { name: "Senecio crassissimus (Vertical Leaf Senecio)", price1g: "$7.45", price5g: "$21.95", condition: "*full flat vertical blue-grey leaves with purple edges" },
  { name: "Senecio mandraliscae (Blue Chalksticks)", price1g: "$6.45", price5g: "$18.95", condition: "*full dense powder-blue chalk pencil groundcover" },
  { name: "Senecio vitalis (Blue Chalk Fingers)", price1g: "$6.45", price5g: "$18.95", condition: "*full fine-textured narrow curved blue succulent fingers" },
  { name: "Strobilanthes atropurpurea (Himalayan Strobilanthes)", price1g: "$8.95", price5g: "$24.95", condition: "*full rare dark green clumps, curved violet-purple trumpets" },
  { name: "Strobilanthes dyerias 'Persian Shield'", price1g: "$8.45", price5g: "$22.95", condition: "*full iridescent metallic purple & silver shield foliage" },
  { name: "Stromanthe sanguinea (Blood Red Stromanthe)", price1g: "$11.95", price5g: "$28.95", condition: "*full glossy dark green leaves with deep maroon undersides" },
  { name: "Stromanthe sanguinea 'Triostar'", price1g: "$12.95", price5g: "$29.95", condition: "*full pink, cream & green marbled foliage, vibrant pink backs" },
  { name: "Synadenium grantii 'Rubra' (African Milk Bush)", price1g: "$12.95", price5g: "$32.95", condition: "*full bronze-wine succulent paddle leaves with green marbling" },
  { name: "Thamnochortus insignis (Albertinia Thatch Reed)", price1g: "$11.95", price5g: "$35.95", condition: "*full reed tussock clumps, golden-bronze seed bracts" },
  { name: "Thymus citriodorus 'Lime' (Lime Thyme)", price1g: "$5.95", condition: "*full bright chartreuse mat, zesty lime aroma, blm" },
  { name: "Thymus praecox 'Coccineus' (Creeping Thyme)", price1g: "$5.95", condition: "*full dense steppable carpet, vibrant magenta-crimson blm" },
  { name: "Thymus praecox 'Elfin' (Elfin Thyme)", price1g: "$5.95", condition: "*full tight miniature flagstone carpet, pale pink-lavender blm" },
  { name: "Tibouchina heteromalla (Silver Leaf Princess Flower)", price1g: "$9.95", price5g: "$32.95", condition: "*full velvety silver plush foliage, glowing royal violet blm" },
  { name: "Tradescantia 'Blue and Gold' (Spiderwort)", price1g: "$6.95", price2g: "$16.95", condition: "*full glowing chartreuse foliage, three-petal royal blue blm" },
  { name: "Tricyrtis 'Empress' (Empress Toad Lily)", price1g: "$7.95", condition: "*full arching laddered foliage, large spotted orchid-like blm" },
  { name: "Tricyrtis formosana 'Gilt Edge'", price1g: "$7.95", condition: "*full gold-edged leaves, starry raspberry-speckled orchid blm" },
  { name: "Tricyrtis 'Taipei Silk' (Toad Lily)", price1g: "$7.95", condition: "*full soft lavender-blue & cream orchid blooms with purple dots" },
  { name: "Woodwardia fimbriata (Giant Chain Fern CA Native)", price1g: "$11.95", price5g: "$28.95", condition: "*full massive arching prehistoric emerald fronds, prime" },
  { name: "Yucca desmetiana 'Blue Boy'", price1g: "$14.95", price5g: "$45.00", condition: "*full soft spineless plum-purple & blue leaves, architectural" },
  { name: "Yucca filamentosa 'Color Guard'", price1g: "$12.95", price5g: "$38.00", condition: "*full bright gold-striped rosettes, curly white filaments" },
  { name: "Zauschneria canum 'Catalina' (California Fuchsia)", price1g: "$6.45", price5g: "$18.95", condition: "*full silvery white mounds, fiery scarlet tubular blm" },
];

export const AvailabilityList: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = AVAILABILITY_DATA.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 border-b border-stone-100 pb-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-500"
              aria-label="Back to Home"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-crescent-green">Nursery Availability</h1>
              <div className="flex items-center gap-2 text-stone-400 text-sm mt-1 uppercase tracking-widest font-bold">
                <Calendar size={14} /> Last Updated: 12/15/25
              </div>
            </div>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
              <input
                type="text"
                placeholder="Filter by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-crescent-green/20 outline-none text-sm transition-all"
              />
              <Search className="absolute left-3 top-2.5 text-stone-400" size={16} />
            </div>
            <button 
              onClick={() => window.print()}
              className="p-2 border border-stone-200 rounded-lg text-stone-500 hover:bg-stone-50 transition-colors"
              title="Print List"
            >
              <Printer size={20} />
            </button>
            <button 
              className="p-2 bg-crescent-green text-white rounded-lg hover:bg-emerald-800 transition-colors"
              title="Download PDF"
            >
              <Download size={20} />
            </button>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 mb-8 flex items-start gap-4">
          <div className="bg-emerald-100 text-emerald-700 p-2 rounded-lg">
             <Calendar size={20} />
          </div>
          <div className="text-sm text-emerald-800">
            <p className="font-bold">Inventory Note:</p>
            <p className="opacity-90">Stock levels change daily. Please call <strong>(831) 246-1128</strong> to confirm availability before visiting. Wholesale customers must provide a valid resale certificate.</p>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto rounded-2xl border border-stone-200 shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">
                <th className="px-6 py-4">Scientific Name</th>
                <th className="px-6 py-4">1gal Price</th>
                <th className="px-6 py-4">2gal Price</th>
                <th className="px-6 py-4">5gal Price</th>
                <th className="px-6 py-4">Condition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredData.map((item, idx) => (
                <tr key={idx} className="hover:bg-stone-50/50 transition-colors group">
                  <td className="px-6 py-4 font-bold text-stone-800 font-serif text-lg group-hover:text-crescent-green transition-colors">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-stone-500 font-medium">
                    {item.price1g || '—'}
                  </td>
                  <td className="px-6 py-4 text-stone-500 font-medium">
                    {item.price2g || '—'}
                  </td>
                  <td className="px-6 py-4 text-stone-500 font-medium">
                    {item.price5g || '—'}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs px-2 py-1 bg-stone-100 text-stone-500 rounded-md font-medium">
                      {item.condition}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center text-stone-400 italic">
                    No items found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="mt-12 text-center text-stone-400 text-xs flex flex-col items-center gap-4">
          <p className="max-w-md">Crescent Hill Nursery Inc. • Watsonville, CA • Ph. 831-246-1128 • www.crescenthillnursery.com</p>
          <div className="h-px w-24 bg-stone-200"></div>
          <p className="uppercase tracking-widest font-bold">Bringing the Wild Home since 1998</p>
        </div>
      </div>
    </div>
  );
};