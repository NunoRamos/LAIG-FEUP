function Pawn(scene, reader, player, pawnNumber) {
    CGFobject.call(this, scene);
    this.scene = scene;
    this.player = player;
    this.xPos = 0;
    this.zPos = 0;
    this.yPos = 2;
    this.pawnNumber = pawnNumber;

    let point1 = vec3.fromValues(0, 0, 1);
    let point2 = vec3.fromValues(0, 0, 0.5);
    let normalAniTime = 0.7;
    let normalAniControlPoints = [point1, point2];
    let normalAniId = 10;

    this.normalAnimation = new LinearAnimation(this.scene, normalAniId, normalAniTime, normalAniControlPoints);

    point1 = vec3.fromValues(0, 0, 1);
    point2 = vec3.fromValues(0, 0, 0.5);
    normalAniTime = 0.7;
    normalAniControlPoints = [point1, point2];
    normalAniId = 10;

    this.finalAnimation = new LinearAnimation(this.scene, normalAniId, normalAniTime, normalAniControlPoints);

    this.orangeMaterial = new CGFappearance(this.scene);
    this.orangeMaterial.setAmbient(1.0, 1, 1, 1);
    this.orangeMaterial.setDiffuse(1.0, 1, 1, 1);
    this.orangeMaterial.setSpecular(1.0, 1, 1, 1);
    this.orangeMaterial.setShininess(0);
    this.orangeMaterial.loadTexture("img/1.jpg");

    this.yellowMaterial = new CGFappearance(this.scene);
    this.yellowMaterial.setAmbient(1.0, 1, 1, 1);
    this.yellowMaterial.setDiffuse(1.0, 1, 1, 1);
    this.yellowMaterial.setSpecular(1.0, 1, 1, 1);
    this.yellowMaterial.setShininess(0);
    this.yellowMaterial.loadTexture("img/2.jpg");

    switch (player) {
        case 1:
            this.material = this.orangeMaterial;
            break;
        case 2:
            this.material = this.yellowMaterial;
            break;
        default:

    }

    this.pawn = new Cylinder(this.scene, 0.23, 0.23, 1, 20, 20);

};

Pawn.prototype = Object.create(CGFobject.prototype);
Pawn.prototype.constructor = Pawn;

Pawn.prototype.display = function() {

    this.scene.pushMatrix();
    this.scene.translate(this.xPos, this.yPos, this.zPos);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    if (this.scene.game.player == this.player && this.scene.game.currentState == this.scene.game.state.SELECTING_PAWN) {
        this.normalAnimation.display();
    }
    if (this.scene.game.player == this.player && this.scene.game.chosenPawn == this.pawnNumber &&
        this.scene.game.currentState == this.scene.game.state.PAWN_ANIMATION) {
          this.finalAnimation.display();
        }
    this.material.apply();
    this.pawn.display();
    this.scene.popMatrix();

}

Pawn.prototype.setPawnXCoord = function(x) {
    this.xPos = x;
}

Pawn.prototype.setPawnZCoord = function(z) {
    this.zPos = z;
}

Pawn.prototype.setPawnYCoord = function(y) {
    this.yPos = y;
}

Pawn.prototype.updateTexCoords = function(s, t) {

}

Pawn.prototype.update = function(deltaTime) {
    if (this.scene.game.player == this.player && this.scene.game.currentState == this.scene.game.state.SELECTING_PAWN) {
        this.normalAnimation.update(deltaTime);
    }

    if (this.scene.game.player == this.player && this.scene.game.chosenPawn == this.pawnNumber &&
        this.scene.game.currentState == this.scene.game.state.PAWN_ANIMATION) {
        this.finalAnimation.update(deltaTime);
        if (this.finalAnimation.over) {
            this.scene.game.currentState = this.scene.game.state.UPDATE_BOARD_WITH_SERVER_BOARD;
            this.finalAnimation.over = false;
        }
    }

}
