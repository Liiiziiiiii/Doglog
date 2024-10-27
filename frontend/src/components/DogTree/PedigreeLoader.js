import Dexie from 'dexie';
import axios from 'axios';

const db = new Dexie('PedigreeDatabase');
db.version(1).stores({
    pedigrees: '++id,name,photo,familyposition,father,mother'
});

class PedigreeLoader {

    async fetchPedigree(dogId, familyPosition) {
        try {
            const response = await axios.get(`https://cdq2m359-5254.euw.devtunnels.ms/api/DogDetails/dog-with-ancestors/${dogId}`);
            const dogData = response.data;

            await this.printAllRelatives(dogData, familyPosition);

            return dogData;
        } catch (error) {
            console.error('Error fetching pedigree data:', error);
            return null;
        }
    }

    async printAllRelatives(dog, familyPosition) {
        await this.determineFamilyPositionsAndSave(dog, familyPosition);

        if (dog.father) {
            await this.printAllRelatives(dog.father, this.getRelativePosition(familyPosition, 'father'));
        }
        if (dog.mother) {
            await this.printAllRelatives(dog.mother, this.getRelativePosition(familyPosition, 'mother'));
        }
    }

    getRelativePosition(parentPosition, currentRelation) {
        if(currentRelation === 'father') {
            if (parentPosition === 'dog') return 'father';
            if (parentPosition === 'father') return 'grandfather(father)';
            if (parentPosition === 'mother') return 'grandfather(mother)';
            if (parentPosition === 'grandfather(father)') return 'great-grandfather(grandfather(father))';
            if (parentPosition === 'grandmother(father)') return 'great-grandfather(grandmother(father))';
            if (parentPosition === 'grandfather(mother)') return 'great-grandfather(grandfather(mother))';
            if (parentPosition === 'grandmother(mother)') return 'great-grandfather(grandmother(mother))';
            if (parentPosition === 'great-grandfather(grandmother(father))') return 'great-grandfather(great-grandfather(grandmother(father)))';
            if (parentPosition === 'great-grandmother(grandmother(father))') return 'great-grandfather(great-grandmother(grandmother(father)))';
            if (parentPosition === 'great-grandmother(grandfather(father))') return 'great-grandfather(great-grandmother(grandfather(father)))';
            if (parentPosition === 'great-grandfather(grandfather(father))') return 'great-grandfather(great-grandfather(grandfather(father)))';


            if (parentPosition === 'great-grandmother(grandmother(mother))') return 'great-grandfather(great-grandmother(grandmother(mother)))';
            if (parentPosition === 'great-grandfather(grandmother(mother))') return 'great-grandfather(great-grandfather(grandmother(mother)))';
            if (parentPosition === 'great-grandmother(grandfather(mother))') return 'great-grandfather(great-grandmother(grandfather(mother)))';
            if (parentPosition === 'great-grandfather(grandfather(mother))') return 'great-grandfather(great-grandfather(grandfather(mother)))';



            if (parentPosition.includes('great-grandfather')) return `great-great-grandfather(${parentPosition.split('(')[1]}`;
            if (parentPosition.includes('great-grandmother')) return `great-great-grandfather(${parentPosition.split('(')[1]}`;
        }
    
        if(currentRelation === 'mother') {
            if (parentPosition === 'dog') return 'mother';
            if (parentPosition === 'father') return 'grandmother(father)';
            if (parentPosition === 'mother') return 'grandmother(mother)';
            if (parentPosition === 'grandfather(father)') return 'great-grandmother(grandfather(father))';
            if (parentPosition === 'grandmother(father)') return 'great-grandmother(grandmother(father))'; 
            if (parentPosition === 'grandfather(mother)') return 'great-grandmother(grandfather(mother))';
            if (parentPosition === 'grandmother(mother)') return 'great-grandmother(grandmother(mother))';
            if (parentPosition === 'great-grandmother(grandmother(father))') return 'great-grandmother(great-grandmother(grandmother(father)))';
            if (parentPosition === 'great-grandfather(grandmother(father))') return 'great-grandmother(great-grandfather(grandmother(father)))';
            if (parentPosition === 'great-grandmother(grandfather(father))') return 'great-grandmother(great-grandmother(grandfather(father)))';
            if (parentPosition === 'great-grandfather(grandfather(father))') return 'great-grandmother(great-grandfather(grandfather(father)))';

            if (parentPosition === 'great-grandmother(grandmother(mother))') return 'great-grandmother(great-grandmother(grandmother(mother)))';
            if (parentPosition === 'great-grandfather(grandmother(mother))') return 'great-grandmother(great-grandfather(grandmother(mother)))';
            if (parentPosition === 'great-grandmother(grandfather(mother))') return 'great-grandmother(great-grandmother(grandfather(mother)))';
            if (parentPosition === 'great-grandfather(grandfather(mother))') return 'great-grandmother(great-grandfather(grandfather(mother)))';


            if (parentPosition.includes('great-grandfather')) return `great-great-grandmother(${parentPosition.split('(')[1]}`;
            if (parentPosition.includes('great-grandmother')) return `great-great-grandmother(${parentPosition.split('(')[1]}`;
        }

        return currentRelation;
    }
    
    
    async determineFamilyPositionsAndSave(dog, ancestorPosition) {
        const existingRecords = await db.pedigrees
            .where('familyposition')
            .equals(ancestorPosition)
            .toArray();

        for (const record of existingRecords) {
            await db.pedigrees.delete(record.id);
        }

        console.log(`Dog Name: ${dog.name}, Position: ${ancestorPosition}`);

        await db.pedigrees.put({
            name: dog.name,
            photo: dog.photo,
            familyposition: ancestorPosition,
            father: dog.father ? dog.father.name : null,
            mother: dog.mother ? dog.mother.name : null
        });
    }
}

export default PedigreeLoader;
